/**
 * @file loc_counter.js
 * @description Counts production lines of code matching automated evaluation harness criteria.
 * Excludes tests, node_modules, .git, coverage, dist, and generated files.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const EXCLUDED_DIRS = new Set(['node_modules', '.git', 'coverage', 'dist', 'build', '.vscode', '.idea']);
const EXCLUDED_FILE_PATTERNS = [/\.test\.js$/, /\.spec\.js$/, /runner\.js$/, /loc_counter\.js$/];

let totalProdLines = 0;
let fileCount = 0;
const languageCounts = {};

function countLinesInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  return lines.length;
}

function traverseDirectory(currentDir) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    const relPath = path.relative(rootDir, fullPath);

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name) || entry.name.startsWith('.')) continue;
      traverseDirectory(fullPath);
    } else if (entry.isFile()) {
      // Check exclusions
      if (EXCLUDED_FILE_PATTERNS.some(p => p.test(entry.name))) continue;

      const ext = path.extname(entry.name).toLowerCase();
      if (['.js', '.jsx', '.ts', '.tsx', '.html', '.css'].includes(ext)) {
        const lines = countLinesInFile(fullPath);
        totalProdLines += lines;
        fileCount++;

        const lang = ext === '.js' || ext === '.jsx' ? 'JavaScript' : ext === '.html' ? 'HTML' : ext === '.css' ? 'CSS' : 'Other';
        languageCounts[lang] = (languageCounts[lang] || 0) + lines;
      }
    }
  }
}

traverseDirectory(rootDir);

console.log('======================================================');
console.log('       PRODUCTION CODEBASE MEASUREMENT REPORT         ');
console.log('======================================================');
console.log(`Total Production LOC : ${totalProdLines.toLocaleString()}`);
console.log(`Total Source Files   : ${fileCount}`);
console.log('Breakdown by Language:');
for (const [lang, count] of Object.entries(languageCounts)) {
  console.log(`  - ${lang.padEnd(12)}: ${count.toLocaleString()} LOC`);
}
console.log('------------------------------------------------------');
if (totalProdLines >= 50000) {
  console.log('\x1b[32m[PASS]\x1b[0m Minimum 50,000+ lines of code requirement MET!');
} else {
  console.log(`\x1b[31m[FAIL]\x1b[0m Need ${50000 - totalProdLines} more LOC to reach 50,000.`);
}
console.log('======================================================\n');
