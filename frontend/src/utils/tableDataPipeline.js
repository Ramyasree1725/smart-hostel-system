/**
 * @fileoverview Smart Hostel Management System - Frontend Table Data Pipeline
 * @module frontend/src/utils/tableDataPipeline
 * @description In-memory search filtering, multi-column sorting, pagination slice calculation,
 * and data transformations for administrative data grids.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Filters an array of items across multiple fields by query string.
 * @param {Array<Object>} items - Array of data rows.
 * @param {string} query - Search term.
 * @param {Array<string>} searchFields - Object keys to test.
 * @returns {Array<Object>} Filtered array.
 */
function searchItems(items, query, searchFields = ['name', 'id', 'roomNumber']) {
  if (!Array.isArray(items)) return [];
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return items;
  }

  const q = query.trim().toLowerCase();
  return items.filter(item => {
    return searchFields.some(field => {
      const val = item[field];
      if (val === undefined || val === null) return false;
      return String(val).toLowerCase().includes(q);
    });
  });
}

/**
 * Sorts an array of items by field and direction.
 * @param {Array<Object>} items - Data array.
 * @param {string} sortKey - Field key.
 * @param {string} [direction='asc'] - 'asc' or 'desc'.
 * @returns {Array<Object>} Sorted copy.
 */
function sortItems(items, sortKey, direction = 'asc') {
  if (!Array.isArray(items) || !sortKey) return items;
  const isAsc = direction.toLowerCase() === 'asc';

  return [...items].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];

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
 * Paginates an array of items.
 * @param {Array<Object>} items - Data array.
 * @param {number} [page=1] - 1-based page index.
 * @param {number} [pageSize=10] - Number of items per page.
 * @returns {Object} { pageItems, totalPages, totalItems, currentPage }
 */
function paginateItems(items, page = 1, pageSize = 10) {
  if (!Array.isArray(items)) {
    return { pageItems: [], totalPages: 0, totalItems: 0, currentPage: 1 };
  }

  const validPageSize = Math.max(1, parseInt(pageSize, 10) || 10);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / validPageSize));
  const currentPage = Math.max(1, Math.min(totalPages, parseInt(page, 10) || 1));

  const startIndex = (currentPage - 1) * validPageSize;
  const pageItems = items.slice(startIndex, startIndex + validPageSize);

  return {
    pageItems,
    totalPages,
    totalItems,
    currentPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
}

module.exports = {
  searchItems,
  sortItems,
  paginateItems
};
