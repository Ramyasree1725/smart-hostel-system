import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { initialSoldiers, initialDevices, initialAlerts } from '../services/mockData';
import { getDashboardStats, getAlerts, getSoldiers, getDevices } from '../services/api';

const SocketContext = createContext(null);

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [soldiers, setSoldiers] = useState(initialSoldiers);
  const [devices, setDevices] = useState(initialDevices);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [latestTelemetry, setLatestTelemetry] = useState(null);
  const [recentNotification, setRecentNotification] = useState(null);
  const [activeTabAlertCount, setActiveTabAlertCount] = useState(0);

  // Audio effect generator using Web Audio API for tactical alert chimes (no external mp3 file needed)
  const playAlertSound = (severity = 'HIGH') => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (severity === 'CRITICAL') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
        osc.frequency.setValueAtTime(659, audioCtx.currentTime + 0.15); // E5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      // Audio context might be restricted before user interaction
    }
  };

  // Initial fetch from REST API
  const refreshData = async () => {
    try {
      const [sRes, dRes, aRes] = await Promise.allSettled([
        getSoldiers(),
        getDevices(),
        getAlerts(),
      ]);

      if (sRes.status === 'fulfilled' && sRes.value.data.success) {
        setSoldiers(sRes.value.data.soldiers);
      }
      if (dRes.status === 'fulfilled' && dRes.value.data.success) {
        setDevices(dRes.value.data.devices);
      }
      if (aRes.status === 'fulfilled' && aRes.value.data.success) {
        setAlerts(aRes.value.data.alerts);
      }
    } catch (err) {
      console.warn('Backend REST unreachable, using internal reactive state.');
    }
  };

  useEffect(() => {
    refreshData();

    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    newSocket.on('connect', () => {
      console.log('Connected to Command Center WebSocket');
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from Command Center WebSocket');
      setConnected(false);
    });

    newSocket.on('initial_state', (data) => {
      if (data.soldiers) setSoldiers(data.soldiers);
      if (data.devices) setDevices(data.devices);
      if (data.alerts) setAlerts(data.alerts);
    });

    newSocket.on('telemetry_update', (telemetry) => {
      setLatestTelemetry(telemetry);
      setSoldiers((prev) =>
        prev.map((s) => {
          if (s.soldierId === telemetry.soldierId) {
            return {
              ...s,
              lastHeartRate: telemetry.heartRate,
              lastTemperature: telemetry.temperature,
              lastSpO2: telemetry.spO2 || s.lastSpO2,
              lastBattery: telemetry.battery,
              lastSeen: telemetry.timestamp,
            };
          }
          return s;
        })
      );
    });

    newSocket.on('soldier_update', (updatedSoldier) => {
      setSoldiers((prev) =>
        prev.map((s) => (s.soldierId === updatedSoldier.soldierId ? updatedSoldier : s))
      );
    });

    newSocket.on('soldier_added', (newSoldier) => {
      setSoldiers((prev) => [...prev, newSoldier]);
    });

    newSocket.on('soldier_deleted', ({ soldierId }) => {
      setSoldiers((prev) => prev.filter((s) => s.soldierId !== soldierId));
    });

    newSocket.on('new_alert', (newAlert) => {
      setAlerts((prev) => [newAlert, ...prev]);
      setRecentNotification(newAlert);
      playAlertSound(newAlert.severity);

      // Auto dismiss banner after 8 seconds
      setTimeout(() => {
        setRecentNotification((current) => (current?.id === newAlert.id ? null : current));
      }, 8000);
    });

    newSocket.on('alert_updated', (updatedAlert) => {
      setAlerts((prev) =>
        prev.map((a) => (a.alertId === updatedAlert.alertId || a.id === updatedAlert.id ? updatedAlert : a))
      );
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Update active alert counts
  useEffect(() => {
    const active = alerts.filter((a) => a.status === 'ACTIVE').length;
    setActiveTabAlertCount(active);
  }, [alerts]);

  // Client-side simulation fallback trigger
  const sendSimulatorTelemetry = (telemetryData) => {
    if (socket && connected) {
      socket.emit('simulate_telemetry', telemetryData);
    } else {
      // Local reactive update when running without backend
      setSoldiers((prev) =>
        prev.map((s) => {
          if (s.soldierId === telemetryData.soldierId) {
            const isWarning =
              telemetryData.heartRate > 120 ||
              telemetryData.heartRate < 50 ||
              telemetryData.temperature > 38.5;
            return {
              ...s,
              lastHeartRate: Number(telemetryData.heartRate),
              lastTemperature: Number(telemetryData.temperature),
              lastBattery: Number(telemetryData.battery),
              healthStatus: isWarning ? 'WARNING' : 'NORMAL',
              lastLocation: telemetryData.latitude
                ? { ...s.lastLocation, lat: Number(telemetryData.latitude), lng: Number(telemetryData.longitude) }
                : s.lastLocation,
            };
          }
          return s;
        })
      );

      // Trigger test alert if abnormal
      if (Number(telemetryData.heartRate) > 120 || Number(telemetryData.temperature) > 38.5 || telemetryData.sosTriggered) {
        const testAlert = {
          id: `alt-local-${Date.now()}`,
          alertId: `ALT-${2000 + alerts.length}`,
          soldierId: telemetryData.soldierId,
          soldierName: soldiers.find((s) => s.soldierId === telemetryData.soldierId)?.displayName || 'Soldier',
          deviceId: telemetryData.deviceId || 'DEV-001',
          type: telemetryData.sosTriggered ? 'SOS_MANUAL_TRIGGER' : Number(telemetryData.heartRate) > 120 ? 'HIGH_HEART_RATE' : 'HIGH_TEMPERATURE',
          severity: telemetryData.sosTriggered ? 'CRITICAL' : 'HIGH',
          message: telemetryData.sosTriggered ? 'SOS panic button triggered by operator' : `Telemetry threshold anomaly (HR: ${telemetryData.heartRate}, Temp: ${telemetryData.temperature}°C)`,
          value: `${telemetryData.heartRate} BPM / ${telemetryData.temperature}°C`,
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
        };
        setAlerts((prev) => [testAlert, ...prev]);
        setRecentNotification(testAlert);
        playAlertSound(testAlert.severity);
      }
    }
  };

  const handleAcknowledge = (alertId, officerName = 'Officer') => {
    if (socket && connected) {
      socket.emit('acknowledge_alert', { alertId, officerName });
    }
    setAlerts((prev) =>
      prev.map((a) =>
        a.alertId === alertId || a.id === alertId
          ? { ...a, status: 'ACKNOWLEDGED', acknowledgedBy: officerName, acknowledgedAt: new Date().toISOString() }
          : a
      )
    );
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        soldiers,
        devices,
        alerts,
        latestTelemetry,
        recentNotification,
        activeTabAlertCount,
        refreshData,
        sendSimulatorTelemetry,
        handleAcknowledge,
        playAlertSound,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
