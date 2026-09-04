/**
 * @fileoverview Smart Hostel Management System - Frontend Notification Toast & Broadcast System
 * @module frontend/src/modules/hostelNotificationSystem
 * @description In-browser toast alert queue, sound effects coordinator, and emergency banner manager.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Toast Notification System.
 */
class HostelNotificationSystem {
  /**
   * Initializes toast controller.
   */
  constructor() {
    this.toastQueue = [];
    this.containerId = 'hostel-toast-container';
  }

  /**
   * Shows a toast notification on the UI.
   * @param {string} message - Text
   * @param {string} [type='info'] - 'success' | 'error' | 'warning' | 'info'
   * @param {number} [durationMs=4000]
   */
  showToast(message, type = 'info', durationMs = 4000) {
    let container = document.getElementById(this.containerId);
    if (!container && typeof document !== 'undefined') {
      container = document.createElement('div');
      container.id = this.containerId;
      container.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm';
      document.body.appendChild(container);
    }

    if (!container) return;

    const toast = document.createElement('div');
    const colorClasses = type === 'success' ? 'bg-emerald-600 text-white'
      : (type === 'error' ? 'bg-rose-600 text-white'
      : (type === 'warning' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-white'));

    toast.className = `px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all transform duration-300 ${colorClasses}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, durationMs);
  }
}

module.exports = {
  HostelNotificationSystem
};
