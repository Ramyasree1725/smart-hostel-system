/**
 * @file offlineMapEngine.js
 * @description Tactical Vector Map Tile Engine & IndexedDB Offline Tile Store.
 * Supports offline Mercator quadkey calculations, tile pre-caching, and tactical overlay rendering.
 */

export class WebMercatorMath {
  static tileSize = 256;

  static latLngToPoint(lat, lng, zoom) {
    const scale = WebMercatorMath.tileSize * Math.pow(2, zoom);
    const siny = Math.min(Math.max(Math.sin(lat * (Math.PI / 180)), -0.9999), 0.9999);
    const x = scale * (0.5 + lng / 360);
    const y = scale * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI));
    return { x, y };
  }

  static pointToLatLng(x, y, zoom) {
    const scale = WebMercatorMath.tileSize * Math.pow(2, zoom);
    const lng = (x / scale - 0.5) * 360;
    const y2 = 0.5 - y / scale;
    const lat = 90 - 360 * Math.atan(Math.exp(-y2 * 2 * Math.PI)) / Math.PI;
    return { lat, lng };
  }

  static latLngToTile(lat, lng, zoom) {
    const pt = WebMercatorMath.latLngToPoint(lat, lng, zoom);
    const tileX = Math.floor(pt.x / WebMercatorMath.tileSize);
    const tileY = Math.floor(pt.y / WebMercatorMath.tileSize);
    return { z: zoom, x: tileX, y: tileY };
  }

  static tileToQuadkey(tileX, tileY, zoom) {
    let quadkey = '';
    for (let i = zoom; i > 0; i--) {
      let digit = 0;
      const mask = 1 << (i - 1);
      if ((tileX & mask) !== 0) digit++;
      if ((tileY & mask) !== 0) digit += 2;
      quadkey += digit;
    }
    return quadkey;
  }
}

export class OfflineTileManager {
  constructor(dbName = 'TacticalOfflineMapsDB', storeName = 'tileCache') {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
  }

  async initialize() {
    if (typeof indexedDB === 'undefined') return false;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'key' });
        }
      };
      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(true);
      };
      request.onerror = (event) => {
        console.warn('IndexedDB failed to open:', event.target.error);
        resolve(false);
      };
    });
  }

  async storeTile(key, blob) {
    if (!this.db) return false;
    return new Promise((resolve) => {
      const tx = this.db.transaction([this.storeName], 'readwrite');
      const store = tx.objectStore(this.storeName);
      store.put({ key, blob, timestamp: Date.now() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  }

  async getTile(key) {
    if (!this.db) return null;
    return new Promise((resolve) => {
      const tx = this.db.transaction([this.storeName], 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ? req.result.blob : null);
      req.onerror = () => resolve(null);
    });
  }
}
