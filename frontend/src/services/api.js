import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('officer_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle unauthenticated sessions
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Avoid redirect loop if already on login
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        localStorage.removeItem('officer_token');
        localStorage.removeItem('officer_user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const loginOfficer = (credentials) => api.post('/auth/login', credentials);
export const getOfficerProfile = () => api.get('/auth/profile');
export const getOfficersList = () => api.get('/auth/officers');

// Soldier Services
export const getSoldiers = (params) => api.get('/soldiers', { params });
export const getSoldierById = (id) => api.get(`/soldiers/${id}`);
export const createSoldier = (data) => api.post('/soldiers', data);
export const updateSoldier = (id, data) => api.put(`/soldiers/${id}`, data);
export const deleteSoldier = (id) => api.delete(`/soldiers/${id}`);

// Device Services
export const getDevices = () => api.get('/devices');
export const createDevice = (data) => api.post('/devices', data);
export const updateDevice = (id, data) => api.put(`/devices/${id}`, data);

// Telemetry & Stats Services
export const getDashboardStats = () => api.get('/telemetry/dashboard-stats');
export const getSoldierTelemetry = (soldierId, limit = 50) => api.get(`/telemetry/${soldierId}?limit=${limit}`);
export const postTelemetryData = (data) => api.post('/telemetry', data);

// Alert Services
export const getAlerts = (params) => api.get('/alerts', { params });
export const acknowledgeAlertApi = (id, officerName) => api.put(`/alerts/${id}/acknowledge`, { officerName });
export const triggerManualAlertApi = (data) => api.post('/alerts/trigger', data);

// Report & Settings Services
export const getReportSummary = (params) => api.get('/reports/summary', { params });
export const getAuditLogs = () => api.get('/reports/audit-logs');
export const getSystemSettings = () => api.get('/settings');
export const updateSystemSettings = (data) => api.put('/settings', data);

export default api;
