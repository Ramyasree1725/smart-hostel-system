const store = require('../services/inMemoryStore');

// GET structured reports (Daily, Weekly, Mission, Sensor Analytics)
const getReportSummary = async (req, res) => {
  try {
    const { timeRange = '24h' } = req.query;

    const totalSoldiers = store.soldiers.length;
    const activeSoldiers = store.soldiers.filter((s) => s.monitoringStatus === 'ACTIVE').length;
    const totalAlerts = store.alerts.length;
    const criticalAlerts = store.alerts.filter((a) => a.severity === 'CRITICAL').length;
    const acknowledgedAlerts = store.alerts.filter((a) => a.status === 'ACKNOWLEDGED').length;

    // Unit breakdown
    const unitBreakdown = {};
    store.soldiers.forEach((s) => {
      unitBreakdown[s.unit] = (unitBreakdown[s.unit] || 0) + 1;
    });

    // Alert types breakdown
    const alertTypeCounts = {};
    store.alerts.forEach((a) => {
      alertTypeCounts[a.type] = (alertTypeCounts[a.type] || 0) + 1;
    });

    // Vitals health distribution
    const healthStatusCounts = {
      NORMAL: store.soldiers.filter((s) => s.healthStatus === 'NORMAL').length,
      WARNING: store.soldiers.filter((s) => s.healthStatus === 'WARNING').length,
      CRITICAL: store.soldiers.filter((s) => s.healthStatus === 'CRITICAL').length,
    };

    res.json({
      success: true,
      reportDate: new Date().toISOString(),
      timeRange,
      summary: {
        totalSoldiers,
        activeSoldiers,
        totalAlerts,
        criticalAlerts,
        acknowledgedAlerts,
        activeDevices: store.devices.filter((d) => d.status === 'ONLINE').length,
      },
      unitBreakdown,
      alertTypeCounts,
      healthStatusCounts,
      soldierRoster: store.soldiers.map((s) => ({
        soldierId: s.soldierId,
        name: s.displayName,
        rank: s.rank,
        unit: s.unit,
        deviceId: s.deviceId,
        heartRate: s.lastHeartRate,
        temperature: s.lastTemperature,
        battery: s.lastBattery,
        status: s.monitoringStatus,
        health: s.healthStatus,
        lastSeen: s.lastSeen,
      })),
      recentAlerts: store.alerts.slice(0, 20),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET audit logs
const getAuditLogs = async (req, res) => {
  try {
    res.json({ success: true, count: store.auditLogs.length, auditLogs: store.auditLogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getReportSummary, getAuditLogs };
