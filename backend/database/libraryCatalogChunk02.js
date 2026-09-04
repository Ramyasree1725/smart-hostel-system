/**
 * @fileoverview Smart Hostel Management System - Library & Study Hall Catalog Chunk 02
 * @module backend/database/libraryCatalogChunk02
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const LIBRARY_CATALOG_CHUNK_02 = [];

const BOOKS_C2 = [
  { title: 'Modern Operating Systems (4th Edition)', author: 'Andrew S. Tanenbaum', domain: 'Operating Systems', isbn: '978-0133591620' },
  { title: 'Artificial Intelligence: A Modern Approach (4th Edition)', author: 'Stuart Russell', domain: 'AI & Data Science', isbn: '978-0134610993' },
  { title: 'Higher Engineering Mathematics', author: 'Dr. B. S. Grewal', domain: 'Mathematics', isbn: '978-8174091955' },
  { title: 'Deep Learning (Adaptive Computation)', author: 'Ian Goodfellow', domain: 'Machine Learning', isbn: '978-0262035613' }
];

for (let i = 1; i <= 100; i++) {
  const b = BOOKS_C2[i % BOOKS_C2.length];
  LIBRARY_CATALOG_CHUNK_02.push({
    chunkId: 'LIB-CHK-02',
    bookIndex: i,
    accessionNo: `LIB-C2-${String(i).padStart(4, '0')}`,
    bookTitle: `${b.title} (Copy #${i})`,
    authorName: b.author,
    subjectCategory: b.domain,
    isbnNumber: b.isbn,
    shelfNumber: `Rack B, Shelf ${1 + (i % 5)}`,
    status: (i % 6 === 0) ? 'CHECKED_OUT' : 'AVAILABLE_ON_SHELF',
    currentBorrower: (i % 6 === 0) ? `Resident STU-${2000 + i}` : null
  });
}

module.exports = {
  LIBRARY_CATALOG_CHUNK_02
};
