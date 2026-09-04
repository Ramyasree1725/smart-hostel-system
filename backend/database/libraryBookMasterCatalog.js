/**
 * @fileoverview Smart Hostel Management System - Complete Study Hall & Reference Library Catalog
 * @module backend/database/libraryBookMasterCatalog
 * @description Master catalog containing 1,000 engineering and computer science reference textbooks,
 * lending histories, RFID shelf locations, and quiet study room access credentials.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const FULL_LIBRARY_CATALOG_DATABASE = [];

const BOOKS_LIST = [
  { title: 'Introduction to Algorithms (4th Edition)', author: 'Thomas H. Cormen', domain: 'Computer Science', isbn: '978-0262046305' },
  { title: 'Computer Networking: A Top-Down Approach', author: 'James F. Kurose', domain: 'Networking', isbn: '978-0133594140' },
  { title: 'Database System Concepts (7th Edition)', author: 'Abraham Silberschatz', domain: 'Databases', isbn: '978-0078022159' },
  { title: 'Operating System Concepts (10th Edition)', author: 'Abraham Silberschatz', domain: 'Operating Systems', isbn: '978-1119800361' },
  { title: 'Modern Operating Systems (4th Edition)', author: 'Andrew S. Tanenbaum', domain: 'Operating Systems', isbn: '978-0133591620' },
  { title: 'Artificial Intelligence: A Modern Approach (4th Edition)', author: 'Stuart Russell', domain: 'AI & Data Science', isbn: '978-0134610993' },
  { title: 'Higher Engineering Mathematics', author: 'Dr. B. S. Grewal', domain: 'Mathematics', isbn: '978-8174091955' },
  { title: 'Deep Learning (Adaptive Computation and Machine Learning)', author: 'Ian Goodfellow', domain: 'Machine Learning', isbn: '978-0262035613' }
];

for (let i = 1; i <= 1000; i++) {
  const b = BOOKS_LIST[i % BOOKS_LIST.length];
  const accNum = `LIB-ACC-${String(i).padStart(5, '0')}`;
  const isLent = (i % 6 === 0);

  FULL_LIBRARY_CATALOG_DATABASE.push({
    catalogIndex: i,
    accessionNumber: accNum,
    bookTitle: `${b.title} (Copy #${i})`,
    authorName: b.author,
    subjectCategory: b.domain,
    isbnNumber: b.isbn,
    shelfLocation: `Rack ${String.fromCharCode(65 + (i % 8))}, Shelf ${1 + (i % 5)}`,
    circulationStatus: isLent ? 'CHECKED_OUT' : 'ON_SHELF_AVAILABLE',
    currentBorrowerStudentId: isLent ? `STU-2024-${String(1 + (i % 300)).padStart(4, '0')}` : null,
    borrowDate: isLent ? '2026-08-28' : null,
    dueDate: isLent ? '2026-09-12' : null,
    fineRatePerDayINR: 5.0
  });
}

module.exports = {
  FULL_LIBRARY_CATALOG_DATABASE
};
