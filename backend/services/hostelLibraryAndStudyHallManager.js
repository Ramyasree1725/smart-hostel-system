/**
 * @fileoverview Smart Hostel Management System - Study Hall & Reference Library Service
 * @module backend/services/hostelLibraryAndStudyHallManager
 * @description Master catalog of 24/7 quiet study hall cubicle reservations, air-conditioned reading room desks,
 * hostel book lending library (500 reference textbooks and journals), and RFID access logs.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Hostel Reference Library Catalog (500 Engineering & Science Textbooks).
 */
const HOSTEL_LIBRARY_DATABASE = [];

const BOOK_TITLES = [
  { title: 'Introduction to Algorithms (CLRS)', author: 'Thomas H. Cormen', category: 'Computer Science', isbn: '978-0262033848' },
  { title: 'Computer Networks (5th Edition)', author: 'Andrew S. Tanenbaum', category: 'Computer Science', isbn: '978-0132126953' },
  { title: 'Database System Concepts (7th Edition)', author: 'Abraham Silberschatz', category: 'Database Systems', isbn: '978-0078022159' },
  { title: 'Operating System Concepts', author: 'Peter Baer Galvin', category: 'Operating Systems', isbn: '978-1118063330' },
  { title: 'Higher Engineering Mathematics', author: 'Dr. B. S. Grewal', category: 'Mathematics', isbn: '978-8174091955' },
  { title: 'Electronic Devices and Circuit Theory', author: 'Robert L. Boylestad', category: 'Electronics', isbn: '978-0137692828' },
  { title: 'Fundamentals of Thermodynamics', author: 'Claus Borgnakke & Richard E. Sonntag', category: 'Mechanical', isbn: '978-0470041925' },
  { title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', category: 'AI & Data Science', isbn: '978-0136042594' }
];

// Seed 500 book inventory items
for (let i = 1; i <= 500; i++) {
  const book = BOOK_TITLES[i % BOOK_TITLES.length];
  const accessionNumber = `LIB-ACC-${String(i).padStart(4, '0')}`;
  const isCheckedOut = (i % 5 === 0);

  HOSTEL_LIBRARY_DATABASE.push({
    accessionNumber: accessionNumber,
    bookTitle: `${book.title} (Vol ${1 + (i % 3)})`,
    primaryAuthor: book.author,
    subjectCategory: book.category,
    isbnNumber: book.isbn,
    shelfLocation: `Rack ${String.fromCharCode(65 + (i % 8))}, Shelf ${1 + (i % 5)}`,
    circulationStatus: isCheckedOut ? 'LENT_TO_STUDENT' : 'AVAILABLE_ON_SHELF',
    currentBorrowerId: isCheckedOut ? `STU-2024-${String(1 + (i % 150)).padStart(4, '0')}` : null,
    borrowedTimestamp: isCheckedOut ? '2026-08-28T11:00:00.000Z' : null,
    dueDate: isCheckedOut ? '2026-09-12' : null,
    finePerDayLateINR: 5.0
  });
}

module.exports = {
  HOSTEL_LIBRARY_DATABASE
};
