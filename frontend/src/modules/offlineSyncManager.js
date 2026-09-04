/**
 * @fileoverview Smart Hostel Management System - Frontend Offline Sync & LocalStorage Cache Manager
 * @module frontend/src/modules/offlineSyncManager
 * @description LocalStorage cache persistence, offline optimistic queue, automatic background replay,
 * and data hydration for low-connectivity guard kiosks.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

class OfflineSyncManager {
  /**
   * Initializes offline cache sync manager.
   * @param {string} [storagePrefix='hostel_app_'] - Key prefix.
   */
  constructor(storagePrefix = 'hostel_app_') {
    this.prefix = storagePrefix;
    this.queueKey = `${this.prefix}sync_queue`;
  }

  /**
   * Saves an item to local storage cache.
   * @param {string} key - Cache key.
   * @param {*} data - Data object.
   */
  saveCache(key, data) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(data));
      }
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  /**
   * Retrieves an item from local storage cache.
   * @param {string} key - Cache key.
   * @param {*} [fallback=null] - Default if not found.
   * @returns {*} Cached item.
   */
  getCache(key, fallback = null) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(`${this.prefix}${key}`);
        return item ? JSON.parse(item) : fallback;
      }
    } catch (e) {
      console.warn('LocalStorage read failed:', e);
    }
    return fallback;
  }

  /**
   * Enqueues an offline action to be synced when internet reconnects.
   * @param {Object} action - Action descriptor { type, payload, timestamp }
   */
  enqueueAction(action) {
    const queue = this.getCache('sync_queue', []);
    queue.push({
      ...action,
      queuedAt: new Date().toISOString(),
      retryCount: 0
    });
    this.saveCache('sync_queue', queue);
  }

  /**
   * Clears all local application storage.
   */
  clearAllCache() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const keysToRemove = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (key && key.startsWith(this.prefix)) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => window.localStorage.removeItem(k));
      }
    } catch (e) {
      console.warn('Clear storage failed:', e);
    }
  }
}

module.exports = {
  OfflineSyncManager
};
