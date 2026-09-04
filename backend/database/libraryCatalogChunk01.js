/**
 * @fileoverview Smart Hostel Management System - Library & Study Hall Catalog Chunk 01
 * @module backend/database/libraryCatalogChunk01
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const LIBRARY_CATALOG_CHUNK_01 = [];

const BOOKS_C1 = [
  { title: 'Introduction to Algorithms (4th Edition)', author: 'Thomas H. Cormen', domain: 'Computer Science', isbn: '978-0262046305' },
  { title: 'Computer Networking: A Top-Down Approach', author: 'James F. Kurose', domain: 'Networking', isbn: '978-0133594140' },
  { title: 'Database System Concepts (7th Edition)', author: 'Abraham Silberschatz', domain: 'Databases', isbn: '978-0078022159' },
  { title: 'Operating System Concepts (10th Edition)', author: 'Abraham Silberschatz', domain: 'Operating Systems', isbn: '978-1119800361' }
];

for (let i = 1; i <= 100; i++) {
  const b = BOOKS_C1[i % BOOKS_C1.length];
  LIBRARY_CATALOG_CHUNK_01.push({
    chunkId: 'LIB-CHK-01',
    bookIndex: i,
    accessionNo: `LIB-C1-${String(i).padStart(4, '0')}`,
    bookTitle: `${b.title} (Copy #${i})`,
    authorName: b.author,
    subjectCategory: b.domain,
    isbnNumber: b.isbn,
    shelfNumber: `Rack A, Shelf ${1 + (i % 5)}`,
    status: (i % 6 === 0) ? 'CHECKED_OUT' : 'AVAILABLE_ON_SHELF',
    currentBorrower: (i % 6 === 0) ? `Resident STU-${1000 + i}` : null
  });
}

module.exports = {
  LIBRARY_CATALOG_CHUNK_01
};
