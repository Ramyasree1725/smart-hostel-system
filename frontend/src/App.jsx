import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AlertBanner } from './components/AlertBanner';
import { TelemetrySimulatorModal } from './components/TelemetrySimulatorModal';
import { SmartBandWidget } from './components/SmartBandWidget';

// Pages
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Soldiers } from './pages/Soldiers';
import { SoldierDetails } from './pages/SoldierDetails';
import { LiveMonitoring } from './pages/LiveMonitoring';
import { LocationMap } from './pages/LocationMap';
import { Alerts } from './pages/Alerts';
import { DeviceManagement } from './pages/DeviceManagement';
import { History } from './pages/History';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Logistics } from './pages/Logistics';
import { Attendance } from './pages/Attendance';
import { MissingSoldiers } from './pages/MissingSoldiers';

// Layout wrapper for authenticated dashboard routes
const AppLayout = () => {
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isBandOpen, setIsBandOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#070B12] overflow-hidden">
      {/* Sidebar */}
      <Sidebar onOpenBand={() => setIsBandOpen(true)} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onOpenSimulator={() => setIsSimulatorOpen(true)} onOpenBand={() => setIsBandOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-16">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/monitoring" element={<LiveMonitoring onOpenSimulator={() => setIsSimulatorOpen(true)} />} />
            <Route path="/map" element={<LocationMap />} />
            <Route path="/missing" element={<MissingSoldiers />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="/soldiers" element={<Soldiers />} />
            <Route path="/soldiers/:id" element={<SoldierDetails />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/devices" element={<DeviceManagement />} />
            <Route path="/history" element={<History />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      {/* Real-time floating alert notification */}
      <AlertBanner />

      {/* Live IoT Hardware Telemetry Simulator Modal */}
      <TelemetrySimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />

      {/* Interactive Soldier Wearable Watch Band Widget */}
      <SmartBandWidget
        isOpen={isBandOpen}
        onClose={() => setIsBandOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Dashboard Protected Layout Routes */}
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
