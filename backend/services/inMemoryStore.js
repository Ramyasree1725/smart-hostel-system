const bcrypt = require('bcryptjs');

class InMemoryStore {
  constructor() {
    this.users = [];
    this.soldiers = [];
    this.devices = [];
    this.telemetryLogs = [];
    this.locationLogs = [];
    this.alerts = [];
    this.supplies = [];
    this.dispatches = [];
    this.settings = {
      key: 'global_config',
      maxHeartRate: 120,
      minHeartRate: 50,
      maxTemperature: 38.5,
      minTemperature: 35.0,
      minSpO2: 90,
      lowBatteryThreshold: 20,
      offlineTimeoutSeconds: 60,
      geofenceCenter: { lat: 17.440081, lng: 78.348915 },
      geofenceRadiusKm: 5.0,
      enableAutoAlerts: true,
      enableSoundAlarms: true,
      simulationIntervalMs: 3000,
    };
    this.auditLogs = [];
    this.io = null;
    this.simulationRunning = true;
    this.init();
  }

  init() {
    // Seed initial demo officers & field doctors
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('officer123', salt);

    this.users = [
      {
        id: 'usr-1',
        officerId: 'OFF-007',
        name: 'Captain Vikram Rathore',
        email: 'officer@defense.mil',
        password: hashedPassword,
        role: 'COMMANDING_OFFICER',
        rank: 'Captain',
        unit: 'Special Tactical Group Alpha',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-2',
        officerId: 'MED-101',
        name: 'Dr. Major Ananya Roy',
        email: 'medic@defense.mil',
        password: hashedPassword,
        role: 'MEDICAL_OFFICER',
        rank: 'Major (Medical Corps)',
        unit: 'Field Hospital Alpha Base',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-3',
        officerId: 'MED-102',
        name: 'Dr. Captain Suresh Nair',
        email: 'suresh.medic@defense.mil',
        password: hashedPassword,
        role: 'FIELD_MEDIC',
        rank: 'Captain (Trauma Medic)',
        unit: 'Mobile Emergency Medical Unit 3',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString(),
      }
    ];

    // Seed Initial Devices
    this.devices = [
      {
        deviceId: 'DEV-001',
        deviceName: 'Bio-Tactical Band Alpha-1',
        assignedSoldierId: 'SOL-001',
        status: 'ONLINE',
        battery: 88,
        signalStrength: 92,
        firmwareVersion: 'v2.4.1-esp32',
        loraFrequency: '868.1 MHz',
        ipAddress: '192.168.1.101',
        lastSeen: new Date().toISOString(),
      },
      {
        deviceId: 'DEV-002',
        deviceName: 'Bio-Tactical Band Alpha-2',
        assignedSoldierId: 'SOL-002',
        status: 'ONLINE',
        battery: 74,
        signalStrength: 85,
        firmwareVersion: 'v2.4.1-esp32',
        loraFrequency: '868.3 MHz',
        ipAddress: '192.168.1.102',
        lastSeen: new Date().toISOString(),
      },
      {
        deviceId: 'DEV-003',
        deviceName: 'Bio-Tactical Band Bravo-1',
        assignedSoldierId: 'SOL-003',
        status: 'ONLINE',
        battery: 42,
        signalStrength: 78,
        firmwareVersion: 'v2.4.1-esp32',
        loraFrequency: '868.5 MHz',
        ipAddress: '192.168.1.103',
        lastSeen: new Date().toISOString(),
      },
      {
        deviceId: 'DEV-004',
        deviceName: 'Bio-Tactical Band Bravo-2',
        assignedSoldierId: 'SOL-004',
        status: 'ONLINE',
        battery: 15,
        signalStrength: 60,
        firmwareVersion: 'v2.4.0-esp32',
        loraFrequency: '868.1 MHz',
        ipAddress: '192.168.1.104',
        lastSeen: new Date().toISOString(),
      },
      {
        deviceId: 'DEV-005',
        deviceName: 'Bio-Tactical Band Charlie-1',
        assignedSoldierId: 'SOL-005',
        status: 'OFFLINE',
        battery: 0,
        signalStrength: 0,
        firmwareVersion: 'v2.3.9-esp32',
        loraFrequency: '868.3 MHz',
        ipAddress: '192.168.1.105',
        lastSeen: new Date(Date.now() - 3600000).toISOString(),
      },
    ];

    // Seed Initial Soldiers
    this.soldiers = [
      {
        soldierId: 'SOL-001',
        displayName: 'Havildar Rajesh Kumar',
        rank: 'Havildar',
        unit: '10 Para Special Forces (Alpha)',
        bloodGroup: 'B+Pos',
        emergencyContact: '+91-9848011223',
        deviceId: 'DEV-001',
        monitoringStatus: 'ACTIVE',
        healthStatus: 'NORMAL',
        tacticalStatus: 'ON_PATROL', // ON_PATROL, IN_COMBAT, IN_DANGER, MISSING, CASUALTY
        lastHeartRate: 76,
        lastTemperature: 36.7,
        lastSpO2: 98,
        lastBattery: 88,
        motionActivity: 'PATROLLING',
        foodRationPercent: 85,
        waterLevelPercent: 70,
        ammoCountRounds: 180,
        lastLocation: {
          lat: 17.4425,
          lng: 78.3495,
          address: 'Tactical Outpost Echo-1',
        },
        lastSeen: new Date().toISOString(),
      },
      {
        soldierId: 'SOL-002',
        displayName: 'Naik Arjun Singh',
        rank: 'Naik',
        unit: '10 Para Special Forces (Alpha)',
        bloodGroup: 'O+Pos',
        emergencyContact: '+91-9876543201',
        deviceId: 'DEV-002',
        monitoringStatus: 'ACTIVE',
        healthStatus: 'NORMAL',
        tacticalStatus: 'ON_PATROL',
        lastHeartRate: 84,
        lastTemperature: 37.1,
        lastSpO2: 97,
        lastBattery: 74,
        motionActivity: 'MOVING',
        foodRationPercent: 90,
        waterLevelPercent: 85,
        ammoCountRounds: 210,
        lastLocation: {
          lat: 17.4382,
          lng: 78.3541,
          address: 'Forward Recon Ridge B',
        },
        lastSeen: new Date().toISOString(),
      },
      {
        soldierId: 'SOL-003',
        displayName: 'Lance Naik Deepankar Das',
        rank: 'Lance Naik',
        unit: 'Bravo Reconnaissance Platoon',
        bloodGroup: 'A+Pos',
        emergencyContact: '+91-9823456789',
        deviceId: 'DEV-003',
        monitoringStatus: 'ACTIVE',
        healthStatus: 'WARNING',
        tacticalStatus: 'IN_DANGER', // in distress
        lastHeartRate: 114,
        lastTemperature: 38.3,
        lastSpO2: 94,
        lastBattery: 42,
        motionActivity: 'RAPID_ASCENT',
        foodRationPercent: 30,
        waterLevelPercent: 20, // Low water!
        ammoCountRounds: 45, // Low ammo!
        lastLocation: {
          lat: 17.4468,
          lng: 78.3412,
          address: 'North Perimeter Hilltop (Hostile Grid)',
        },
        lastSeen: new Date().toISOString(),
      },
      {
        soldierId: 'SOL-004',
        displayName: 'Sepoy Manoj Verma',
        rank: 'Sepoy',
        unit: 'Bravo Reconnaissance Platoon',
        bloodGroup: 'AB+Pos',
        emergencyContact: '+91-9812345678',
        deviceId: 'DEV-004',
        monitoringStatus: 'ACTIVE',
        healthStatus: 'WARNING',
        tacticalStatus: 'ON_PATROL',
        lastHeartRate: 72,
        lastTemperature: 36.5,
        lastSpO2: 99,
        lastBattery: 15,
        motionActivity: 'STATIONARY',
        foodRationPercent: 65,
        waterLevelPercent: 40,
        ammoCountRounds: 150,
        lastLocation: {
          lat: 17.4351,
          lng: 78.3429,
          address: 'Sector 4 Communication Bunker',
        },
        lastSeen: new Date().toISOString(),
      },
      {
        soldierId: 'SOL-005',
        displayName: 'Subedar Gurpreet Singh',
        rank: 'Subedar',
        unit: 'Charlie Support Contingent',
        bloodGroup: 'O-Neg',
        emergencyContact: '+91-9988776655',
        deviceId: 'DEV-005',
        monitoringStatus: 'OFFLINE',
        healthStatus: 'CRITICAL',
        tacticalStatus: 'MISSING', // Lost contact / Missing soldier
        lastHeartRate: 0,
        lastTemperature: 0,
        lastSpO2: 0,
        lastBattery: 0,
        motionActivity: 'UNKNOWN',
        foodRationPercent: 0,
        waterLevelPercent: 0,
        ammoCountRounds: 0,
        lastLocation: {
          lat: 17.4495,
          lng: 78.3582,
          address: 'East Valley Checkpoint 9 (Last Known Coordinates)',
        },
        lastSeen: new Date(Date.now() - 3600000).toISOString(),
      },
    ];

    // Seed Active Supply Drops & Logistics Orders
    this.supplies = [
      {
        id: 'sup-001',
        supplyId: 'DROP-501',
        soldierId: 'SOL-003',
        soldierName: 'Lance Naik Deepankar Das',
        items: ['Water Packs (5L)', '5.56mm Ammo (120 Rds)', 'Trauma First Aid Kit'],
        method: 'DRONE_AIR_DROP', // DRONE_AIR_DROP, GROUND_TACTICAL_VEHICLE
        status: 'EN_ROUTE', // PREPARING, EN_ROUTE, DELIVERED, RECEIVED
        etaMinutes: 4,
        targetLocation: { lat: 17.4468, lng: 78.3412 },
        dispatchedAt: new Date(Date.now() - 6 * 60000).toISOString(),
      },
      {
        id: 'sup-002',
        supplyId: 'DROP-502',
        soldierId: 'SOL-001',
        soldierName: 'Havildar Rajesh Kumar',
        items: ['MRE Tactical Rations (3 Days)', 'Fresh Drinking Water (10L)'],
        method: 'GROUND_TACTICAL_VEHICLE',
        status: 'DELIVERED',
        etaMinutes: 0,
        targetLocation: { lat: 17.4425, lng: 78.3495 },
        dispatchedAt: new Date(Date.now() - 45 * 60000).toISOString(),
      }
    ];

    // Seed Active Dispatches (Medics & Reinforcements)
    this.dispatches = [
      {
        id: 'dsp-001',
        dispatchId: 'MED-DSP-801',
        type: 'DOCTOR_DISPATCH',
        soldierId: 'SOL-003',
        soldierName: 'Lance Naik Deepankar Das',
        assignedPersonnel: 'Dr. Major Ananya Roy (Field Hospital Base)',
        reason: 'Elevated core temp 38.3°C & Acute Dehydration',
        status: 'EN_ROUTE', // ASSIGNED, EN_ROUTE, ON_SITE, COMPLETED
        etaMinutes: 6,
        targetLocation: { lat: 17.4468, lng: 78.3412 },
        dispatchedAt: new Date(Date.now() - 4 * 60000).toISOString(),
      },
      {
        id: 'dsp-002',
        dispatchId: 'QRT-DSP-901',
        type: 'REINFORCEMENTS_DISPATCH',
        soldierId: 'SOL-005',
        soldierName: 'Subedar Gurpreet Singh (MISSING)',
        assignedPersonnel: 'Quick Reaction Team Alpha (4 Commandos)',
        reason: 'Missing Soldier Search & Rescue Operation',
        status: 'SEARCHING_AREA',
        etaMinutes: 12,
        targetLocation: { lat: 17.4495, lng: 78.3582 },
        dispatchedAt: new Date(Date.now() - 20 * 60000).toISOString(),
      }
    ];

    // Seed Initial Alerts
    this.alerts = [
      {
        id: 'alt-001',
        alertId: 'ALT-1001',
        soldierId: 'SOL-003',
        soldierName: 'Lance Naik Deepankar Das',
        deviceId: 'DEV-003',
        type: 'HEALTH_DISTRESS',
        severity: 'HIGH',
        message: 'Elevated core body temperature detected (38.3°C) & Low Water Supply (20%)',
        value: '38.3°C / 20% H2O',
        status: 'DISPATCHED_MEDIC',
        actionTaken: 'Medical Doctor Dispatched (Dr. Major Ananya Roy)',
        createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
      },
      {
        id: 'alt-002',
        alertId: 'ALT-1002',
        soldierId: 'SOL-005',
        soldierName: 'Subedar Gurpreet Singh',
        deviceId: 'DEV-005',
        type: 'MISSING_SOLDIER',
        severity: 'CRITICAL',
        message: 'SOLDIER MISSING: No signal for > 60 mins. Last known GPS location locked.',
        value: 'Offline / Missing',
        status: 'DISPATCHED_REINFORCEMENTS',
        actionTaken: 'QRT Reinforcements Assigned & Deployed',
        createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
      },
      {
        id: 'alt-003',
        alertId: 'ALT-1003',
        soldierId: 'SOL-004',
        soldierName: 'Sepoy Manoj Verma',
        deviceId: 'DEV-004',
        type: 'LOW_BATTERY',
        severity: 'MEDIUM',
        message: 'Tactical Watch Battery critical (15%). Supply replacement battery needed.',
        value: '15%',
        status: 'ACTIVE',
        actionTaken: null,
        createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
      },
    ];

    this.logAudit('SYSTEM_INIT', 'Smart Soldier Command Center initialized with Doctor Dispatch, Reinforcements & Supply modules.');
  }

  setSocketIO(io) {
    this.io = io;
  }

  logAudit(action, details, officerId = 'COMMANDER') {
    const log = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      details,
      officerId,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 200) this.auditLogs.pop();
  }

  // Dispatch Field Doctor / Medical Officer to a Soldier
  dispatchDoctor(soldierId, doctorName, reason = 'Severe Health Distress') {
    const soldier = this.soldiers.find((s) => s.soldierId === soldierId);
    if (!soldier) return null;

    const dispatch = {
      id: `dsp-${Date.now()}`,
      dispatchId: `MED-DSP-${100 + this.dispatches.length + 1}`,
      type: 'DOCTOR_DISPATCH',
      soldierId: soldier.soldierId,
      soldierName: soldier.displayName,
      assignedPersonnel: doctorName || 'Dr. Major Ananya Roy (Field Hospital)',
      reason,
      status: 'EN_ROUTE',
      etaMinutes: Math.floor(Math.random() * 5 + 3),
      targetLocation: soldier.lastLocation,
      dispatchedAt: new Date().toISOString(),
    };

    this.dispatches.unshift(dispatch);
    soldier.healthStatus = 'MEDICAL_EN_ROUTE';

    // Update alert status
    const alert = this.alerts.find((a) => a.soldierId === soldierId && a.status === 'ACTIVE');
    if (alert) {
      alert.status = 'DISPATCHED_MEDIC';
      alert.actionTaken = `Medical Doctor Dispatched (${dispatch.assignedPersonnel})`;
    }

    this.logAudit('DOCTOR_DISPATCHED', `Commander dispatched ${dispatch.assignedPersonnel} to soldier ${soldier.displayName} (${soldier.soldierId})`);

    if (this.io) {
      this.io.emit('doctor_dispatched', dispatch);
      this.io.emit('soldier_update', soldier);
      this.io.emit('new_alert', {
        id: `alt-med-${Date.now()}`,
        alertId: `INFO-${Math.floor(Math.random() * 8000 + 1000)}`,
        soldierId: soldier.soldierId,
        soldierName: soldier.displayName,
        type: 'DOCTOR_DISPATCHED',
        severity: 'LOW',
        message: `Medical Doctor (${dispatch.assignedPersonnel}) is EN ROUTE to ${soldier.displayName}. ETA: ${dispatch.etaMinutes} mins.`,
        status: 'ACKNOWLEDGED',
        createdAt: new Date().toISOString(),
      });
    }

    return dispatch;
  }

  // Dispatch Tactical Reinforcements / Backup to Missing or In-Danger Soldier
  dispatchReinforcements(soldierId, backupTeamName, reason = 'Combat Danger / Missing Soldier Support') {
    const soldier = this.soldiers.find((s) => s.soldierId === soldierId);
    if (!soldier) return null;

    const dispatch = {
      id: `dsp-${Date.now()}`,
      dispatchId: `QRT-DSP-${200 + this.dispatches.length + 1}`,
      type: 'REINFORCEMENTS_DISPATCH',
      soldierId: soldier.soldierId,
      soldierName: soldier.displayName,
      assignedPersonnel: backupTeamName || 'Quick Reaction Team Alpha (4 Commandos)',
      reason,
      status: 'EN_ROUTE',
      etaMinutes: Math.floor(Math.random() * 8 + 4),
      targetLocation: soldier.lastLocation,
      dispatchedAt: new Date().toISOString(),
    };

    this.dispatches.unshift(dispatch);
    soldier.tacticalStatus = 'REINFORCEMENTS_EN_ROUTE';

    const alert = this.alerts.find((a) => a.soldierId === soldierId && a.status === 'ACTIVE');
    if (alert) {
      alert.status = 'DISPATCHED_REINFORCEMENTS';
      alert.actionTaken = `Reinforcements Assigned (${dispatch.assignedPersonnel})`;
    }

    this.logAudit('REINFORCEMENTS_DISPATCHED', `Commander assigned reinforcements (${dispatch.assignedPersonnel}) to assist ${soldier.displayName}`);

    if (this.io) {
      this.io.emit('reinforcements_dispatched', dispatch);
      this.io.emit('soldier_update', soldier);
    }

    return dispatch;
  }

  // Dispatch Supply Drop (Food, Water, Weapons/Ammunition, Medical Kits)
  dispatchSupplyDrop(soldierId, items, method = 'DRONE_AIR_DROP') {
    const soldier = this.soldiers.find((s) => s.soldierId === soldierId);
    if (!soldier) return null;

    const supply = {
      id: `sup-${Date.now()}`,
      supplyId: `DROP-${500 + this.supplies.length + 1}`,
      soldierId: soldier.soldierId,
      soldierName: soldier.displayName,
      items: items && items.length > 0 ? items : ['Fresh Drinking Water (5L)', 'MRE Tactical Food (2 Days)', '5.56mm Ammo (120 Rds)'],
      method,
      status: 'EN_ROUTE',
      etaMinutes: method === 'DRONE_AIR_DROP' ? 3 : 10,
      targetLocation: soldier.lastLocation,
      dispatchedAt: new Date().toISOString(),
    };

    this.supplies.unshift(supply);

    // Replenish soldier levels over simulated time
    setTimeout(() => {
      supply.status = 'DELIVERED';
      soldier.foodRationPercent = Math.min(100, (soldier.foodRationPercent || 50) + 40);
      soldier.waterLevelPercent = Math.min(100, (soldier.waterLevelPercent || 50) + 50);
      soldier.ammoCountRounds = (soldier.ammoCountRounds || 60) + 120;
      if (this.io) {
        this.io.emit('supply_updated', supply);
        this.io.emit('soldier_update', soldier);
      }
    }, 15000);

    this.logAudit('SUPPLY_DISPATCHED', `Commander dispatched ${method} [${supply.items.join(', ')}] to soldier ${soldier.displayName}`);

    if (this.io) {
      this.io.emit('supply_dispatched', supply);
    }

    return supply;
  }

  // Calculate distance between coordinates
  calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Process Telemetry Ingestion from Smart Band or Simulator
  ingestTelemetry(data) {
    const {
      soldierId,
      deviceId,
      heartRate,
      temperature,
      spO2 = 98,
      battery,
      latitude,
      longitude,
      motionActivity,
      sosTriggered,
      healthDistressTriggered,
      dangerCombatTriggered,
      supplyRequest,
    } = data;

    const targetSoldier = this.soldiers.find((s) => s.soldierId === soldierId || (deviceId && s.deviceId === deviceId));
    const targetDevice = this.devices.find((d) => d.deviceId === deviceId || (targetSoldier && d.deviceId === targetSoldier.deviceId));

    const sId = targetSoldier ? targetSoldier.soldierId : soldierId || 'SOL-UNKNOWN';
    const dId = targetDevice ? targetDevice.deviceId : deviceId || 'DEV-UNKNOWN';
    const sName = targetSoldier ? targetSoldier.displayName : 'Field Soldier';
    const timestamp = new Date().toISOString();

    const telemetryEntry = {
      id: `tel-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      soldierId: sId,
      deviceId: dId,
      heartRate: Number(heartRate),
      temperature: Number(temperature),
      spO2: Number(spO2),
      battery: Number(battery),
      signal: targetDevice ? targetDevice.signalStrength : 85,
      motionActivity: motionActivity || (targetSoldier ? targetSoldier.motionActivity : 'PATROLLING'),
      sosTriggered: !!sosTriggered,
      timestamp,
    };

    this.telemetryLogs.push(telemetryEntry);
    if (this.telemetryLogs.length > 500) this.telemetryLogs.shift();

    // Update Device
    if (targetDevice) {
      targetDevice.battery = Number(battery);
      targetDevice.status = battery <= this.settings.lowBatteryThreshold ? 'LOW_BATTERY' : 'ONLINE';
      targetDevice.lastSeen = timestamp;
    }

    // Health calculation
    let healthStatus = 'NORMAL';
    if (
      heartRate > this.settings.maxHeartRate ||
      heartRate < this.settings.minHeartRate ||
      temperature > this.settings.maxTemperature ||
      spO2 < this.settings.minSpO2 ||
      healthDistressTriggered
    ) {
      healthStatus = (heartRate > 140 || temperature > 39.5 || spO2 < 85 || healthDistressTriggered) ? 'CRITICAL' : 'WARNING';
    }

    if (targetSoldier) {
      targetSoldier.lastHeartRate = Number(heartRate);
      targetSoldier.lastTemperature = Number(temperature);
      targetSoldier.lastSpO2 = Number(spO2);
      targetSoldier.lastBattery = Number(battery);
      targetSoldier.healthStatus = healthStatus;
      targetSoldier.monitoringStatus = 'ACTIVE';
      targetSoldier.lastSeen = timestamp;

      if (dangerCombatTriggered) {
        targetSoldier.tacticalStatus = 'IN_DANGER';
      }

      if (latitude && longitude) {
        targetSoldier.lastLocation.lat = Number(latitude);
        targetSoldier.lastLocation.lng = Number(longitude);
      }
    }

    // Process SOS Panic
    if (sosTriggered) {
      this.createAlert({
        soldierId: sId,
        soldierName: sName,
        deviceId: dId,
        type: 'SOS_MANUAL_TRIGGER',
        severity: 'CRITICAL',
        message: `🚨 EMERGENCY SOS: Soldier ${sName} activated Smart Band panic beacon! Immediate response required!`,
        value: 'SOS ACTIVE',
        location: targetSoldier ? targetSoldier.lastLocation : undefined,
      });
    }

    // Process Direct Health Distress
    if (healthDistressTriggered || (heartRate > 135 && temperature > 39.0)) {
      this.createAlert({
        soldierId: sId,
        soldierName: sName,
        deviceId: dId,
        type: 'HEALTH_DISTRESS',
        severity: 'CRITICAL',
        message: `🚑 HEALTH DISTRESS: Soldier ${sName} vitals critically abnormal (HR: ${heartRate} BPM, Temp: ${temperature}°C). Dispatch Doctor!`,
        value: `${heartRate} BPM / ${temperature}°C`,
        location: targetSoldier ? targetSoldier.lastLocation : undefined,
      });
    }

    // Process Danger / Combat Distress
    if (dangerCombatTriggered) {
      this.createAlert({
        soldierId: sId,
        soldierName: sName,
        deviceId: dId,
        type: 'COMBAT_DANGER',
        severity: 'CRITICAL',
        message: `⚔️ HOSTILE CONTACT / DANGER: Soldier ${sName} requested urgent backup reinforcements at coordinates!`,
        value: 'IN DANGER',
        location: targetSoldier ? targetSoldier.lastLocation : undefined,
      });
    }

    // Process Supply Request from Band
    if (supplyRequest) {
      this.createAlert({
        soldierId: sId,
        soldierName: sName,
        deviceId: dId,
        type: 'SUPPLY_REQUEST',
        severity: 'HIGH',
        message: `📦 SUPPLY NEEDED: Soldier ${sName} requested tactical supplies (${supplyRequest})`,
        value: supplyRequest,
        location: targetSoldier ? targetSoldier.lastLocation : undefined,
      });
    }

    // Broadcast Real-time Events via Socket.IO
    if (this.io) {
      this.io.emit('telemetry_update', telemetryEntry);
      if (targetSoldier) {
        this.io.emit('soldier_update', targetSoldier);
      }
    }

    return { telemetry: telemetryEntry, soldier: targetSoldier, device: targetDevice };
  }

  createAlert(alertData) {
    const recentDuplicate = this.alerts.find(
      (a) =>
        a.soldierId === alertData.soldierId &&
        a.type === alertData.type &&
        a.status === 'ACTIVE' &&
        Date.now() - new Date(a.createdAt).getTime() < 30000
    );

    if (recentDuplicate) return recentDuplicate;

    const newAlert = {
      id: `alt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      alertId: `ALT-${1000 + this.alerts.length + 1}`,
      soldierId: alertData.soldierId,
      soldierName: alertData.soldierName || 'Field Soldier',
      deviceId: alertData.deviceId || 'DEV-001',
      type: alertData.type,
      severity: alertData.severity || 'MEDIUM',
      message: alertData.message,
      value: alertData.value || '',
      status: 'ACTIVE',
      actionTaken: null,
      location: alertData.location,
      createdAt: new Date().toISOString(),
    };

    this.alerts.unshift(newAlert);
    this.logAudit('ALERT_TRIGGERED', `Alert [${newAlert.type}] for ${newAlert.soldierName}: ${newAlert.message}`);

    if (this.io) {
      this.io.emit('new_alert', newAlert);
    }

    return newAlert;
  }

  acknowledgeAlert(alertId, officerName = 'Commander') {
    const alert = this.alerts.find((a) => a.alertId === alertId || a.id === alertId);
    if (alert) {
      alert.status = 'ACKNOWLEDGED';
      alert.acknowledgedBy = officerName;
      alert.acknowledgedAt = new Date().toISOString();
      this.logAudit('ALERT_ACKNOWLEDGED', `Alert ${alert.alertId} acknowledged by ${officerName}`);

      if (this.io) {
        this.io.emit('alert_updated', alert);
      }
      return alert;
    }
    return null;
  }

  startLiveDrift() {
    setInterval(() => {
      if (!this.simulationRunning) return;
      this.soldiers.forEach((soldier) => {
        if (soldier.monitoringStatus === 'ACTIVE') {
          const hrDelta = Math.floor(Math.random() * 3) - 1;
          const tempDelta = Math.random() * 0.1 - 0.05;
          let newHr = Math.max(60, Math.min(130, soldier.lastHeartRate + hrDelta));
          let newTemp = Number(Math.max(36.0, Math.min(39.0, soldier.lastTemperature + tempDelta)).toFixed(1));
          let newBat = Math.max(5, soldier.lastBattery - (Math.random() < 0.03 ? 1 : 0));

          this.ingestTelemetry({
            soldierId: soldier.soldierId,
            deviceId: soldier.deviceId,
            heartRate: newHr,
            temperature: newTemp,
            spO2: soldier.lastSpO2 || 98,
            battery: newBat,
            motionActivity: soldier.motionActivity,
          });
        }
      });
    }, 5000);
  }
}

const store = new InMemoryStore();
store.startLiveDrift();

module.exports = store;
