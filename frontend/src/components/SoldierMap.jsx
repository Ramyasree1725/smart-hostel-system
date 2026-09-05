import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix default Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;

const createSoldierIcon = (status, health) => {
  let color = '#10B981'; // green
  if (status === 'OFFLINE') color = '#64748B'; // gray
  else if (health === 'CRITICAL') color = '#EF4444'; // red
  else if (health === 'WARNING') color = '#F59E0B'; // amber

  const pulseClass = health === 'CRITICAL' ? 'animate-ping' : '';

  const html = `
    <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: 28px; height: 28px; border-radius: 50%; background: ${color}; opacity: 0.3;" class="${pulseClass}"></div>
      <div style="width: 20px; height: 20px; border-radius: 50%; background: ${color}; border: 2px solid #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${color};">
        <div style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff;"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-soldier-marker',
    html,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

const baseStationIcon = L.divIcon({
  className: 'custom-base-marker',
  html: `
    <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: #06B6D4; border-radius: 8px; border: 2px solid #ffffff; box-shadow: 0 0 15px rgba(6, 182, 212, 0.6);">
      <svg style="width: 20px; height: 20px; fill: #ffffff;" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// Component to dynamically re-center map if focus Soldier changes
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);
  return null;
};

export const SoldierMap = ({
  soldiers = [],
  selectedSoldier = null,
  geofenceRadiusKm = 5,
  center = [17.440081, 78.348915],
  height = '420px',
  interactive = true,
}) => {
  const mapCenter = selectedSoldier?.lastLocation
    ? [selectedSoldier.lastLocation.lat, selectedSoldier.lastLocation.lng]
    : center;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950" style={{ height }}>
      {/* Tactical Grid & Radar Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-tactical-grid opacity-20"></div>

      <MapContainer
        center={mapCenter}
        zoom={14}
        scrollWheelZoom={interactive}
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <ChangeMapView center={mapCenter} />

        {/* Real World States & Roads Map Tiles (OpenStreetMap - 100% Free, Zero API Key) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Base Station HQ */}
        <Marker position={center} icon={baseStationIcon}>
          <Popup className="tactical-popup">
            <div className="text-slate-900">
              <h4 className="font-bold text-xs">Sector Alpha Command Base</h4>
              <p className="text-[11px] text-slate-600">IoT Gateway & Command Station</p>
              <p className="text-[10px] font-mono mt-1 text-cyan-700">GPS: {center[0]}, {center[1]}</p>
            </div>
          </Popup>
        </Marker>

        {/* Geofence Perimeter Safe Zone */}
        <Circle
          center={center}
          radius={geofenceRadiusKm * 1000}
          pathOptions={{
            color: '#06B6D4',
            fillColor: '#06B6D4',
            fillOpacity: 0.06,
            dashArray: '4, 8',
            weight: 2,
          }}
        />

        {/* Soldier Markers */}
        {soldiers.map((soldier) => {
          if (!soldier.lastLocation?.lat || !soldier.lastLocation?.lng) return null;
          const pos = [soldier.lastLocation.lat, soldier.lastLocation.lng];

          return (
            <Marker
              key={soldier.soldierId}
              position={pos}
              icon={createSoldierIcon(soldier.monitoringStatus, soldier.healthStatus)}
            >
              <Popup>
                <div className="text-slate-900 p-1 min-w-[180px]">
                  <div className="flex items-center justify-between border-b pb-1">
                    <span className="font-bold text-xs text-slate-900">{soldier.displayName}</span>
                    <span className="text-[10px] font-mono bg-slate-200 px-1 rounded">{soldier.soldierId}</span>
                  </div>
                  <div className="mt-1.5 space-y-0.5 text-[11px] text-slate-700">
                    <p><span className="font-medium">Unit:</span> {soldier.unit}</p>
                    <p><span className="font-medium">Heart Rate:</span> <span className="font-bold text-rose-600">{soldier.lastHeartRate || '--'} BPM</span></p>
                    <p><span className="font-medium">Temp:</span> <span className="font-bold text-amber-600">{soldier.lastTemperature || '--'} °C</span></p>
                    <p><span className="font-medium">Battery:</span> {soldier.lastBattery || '--'}%</p>
                    <p><span className="font-medium">Activity:</span> {soldier.motionActivity || 'Patrolling'}</p>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 font-mono">
                    Updated: {new Date(soldier.lastSeen || Date.now()).toLocaleTimeString()}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Mini Tactical HUD Overlay Legend */}
      <div className="absolute bottom-3 left-3 z-10 rounded-lg border border-slate-800 bg-slate-900/90 p-2.5 backdrop-blur-md text-[10px] space-y-1">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span className="text-slate-300">Vitals Normal</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          <span className="text-slate-300">Biometric Warning</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-rose-500"></span>
          <span className="text-slate-300">Critical / SOS Emergency</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-slate-500"></span>
          <span className="text-slate-300">Device Offline</span>
        </div>
      </div>
    </div>
  );
};
