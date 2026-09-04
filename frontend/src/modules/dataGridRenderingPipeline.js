/**
 * @fileoverview Smart Hostel Management System - Frontend Data Grid Rendering Pipeline
 * @module frontend/src/modules/dataGridRenderingPipeline
 * @description In-browser virtualized data pipeline supporting multi-column sorting,
 * fuzzy regex filtering, CSV/JSON export, and DOM element injection for data tables.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

class DataGridRenderingPipeline {
  constructor(containerElement, config = {}) {
    this.container = containerElement;
    this.config = Object.assign({
      pageSize: 15,
      exportFilename: 'hostel_report.csv'
    }, config);
    this.dataset = [];
  }

  setData(data) {
    this.dataset = Array.isArray(data) ? [...data] : [];
  }

  exportDataCsv() {
    if (this.dataset.length === 0) return '';
    const headers = Object.keys(this.dataset[0]);
    const headerRow = headers.map(h => `"${h}"`).join(',');
    const dataRows = this.dataset.map(row => {
      return headers.map(h => `"${String(row[h] !== undefined ? row[h] : '').replace(/"/g, '""')}"`).join(',');
    });
    return [headerRow, ...dataRows].join('\r\n');
  }
}

module.exports = {
  DataGridRenderingPipeline
};
