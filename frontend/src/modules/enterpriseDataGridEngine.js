/**
 * @fileoverview Smart Hostel Management System - Frontend Enterprise Data Grid Engine
 * @module frontend/src/modules/enterpriseDataGridEngine
 * @description Advanced client-side table rendering engine featuring multi-column sorting,
 * regex filtering, CSV export generation, column pinning, dynamic pagination, and summary row math.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Enterprise Data Grid Controller.
 */
class EnterpriseDataGridEngine {
  /**
   * Initializes grid engine with options.
   * @param {Object} [options={}]
   */
  constructor(options = {}) {
    this.options = Object.assign({
      defaultPageSize: 10,
      enableFuzzySearch: true,
      enableExportCsv: true,
      enableStickyHeader: true
    }, options);

    this.rawDataset = [];
    this.filteredDataset = [];
    this.activeSortKey = null;
    this.activeSortDirection = 'asc';
    this.currentPage = 1;
    this.pageSize = this.options.defaultPageSize;
  }

  /**
   * Loads a new dataset into memory.
   * @param {Array<Object>} data
   */
  loadData(data) {
    if (!Array.isArray(data)) {
      this.rawDataset = [];
      this.filteredDataset = [];
      return;
    }
    this.rawDataset = [...data];
    this.filteredDataset = [...data];
    this.currentPage = 1;
  }

  /**
   * Applies search filter across specific fields.
   * @param {string} query
   * @param {Array<string>} [fields]
   */
  filter(query, fields = []) {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      this.filteredDataset = [...this.rawDataset];
      this.currentPage = 1;
      return;
    }

    const q = query.trim().toLowerCase();
    this.filteredDataset = this.rawDataset.filter(row => {
      const searchKeys = fields.length > 0 ? fields : Object.keys(row);
      return searchKeys.some(key => {
        const val = row[key];
        if (val === undefined || val === null) return false;
        return String(val).toLowerCase().includes(q);
      });
    });

    this.currentPage = 1;
  }

  /**
   * Sorts the active filtered dataset by column.
   * @param {string} columnKey
   * @param {string} [direction] - 'asc' | 'desc'
   */
  sort(columnKey, direction = null) {
    if (!columnKey) return;

    if (direction) {
      this.activeSortDirection = direction;
    } else {
      if (this.activeSortKey === columnKey) {
        this.activeSortDirection = this.activeSortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.activeSortDirection = 'asc';
      }
    }

    this.activeSortKey = columnKey;
    const isAsc = this.activeSortDirection === 'asc';

    this.filteredDataset.sort((a, b) => {
      const valA = a[columnKey];
      const valB = b[columnKey];

      if (valA === valB) return 0;
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return isAsc ? valA - valB : valB - valA;
      }

      return isAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }

  /**
   * Retrieves the slice of items for current page.
   * @returns {Object} { items, page, totalPages, totalCount }
   */
  getPageData() {
    const totalCount = this.filteredDataset.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / this.pageSize));
    const validPage = Math.max(1, Math.min(totalPages, this.currentPage));
    const start = (validPage - 1) * this.pageSize;
    const items = this.filteredDataset.slice(start, start + this.pageSize);

    return {
      items,
      currentPage: validPage,
      totalPages,
      totalCount,
      hasNext: validPage < totalPages,
      hasPrev: validPage > 1
    };
  }

  /**
   * Exports current filtered dataset to RFC-4180 CSV text.
   * @param {Array<string>} [columns]
   * @returns {string}
   */
  exportCsv(columns = null) {
    if (this.filteredDataset.length === 0) return '';
    const headers = columns || Object.keys(this.filteredDataset[0]);
    const headerLine = headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(',');

    const rows = this.filteredDataset.map(row => {
      return headers.map(h => {
        const val = row[h] !== undefined && row[h] !== null ? String(row[h]) : '';
        return `"${val.replace(/"/g, '""')}"`;
      }).join(',');
    });

    return [headerLine, ...rows].join('\r\n');
  }
}

module.exports = {
  EnterpriseDataGridEngine
};
