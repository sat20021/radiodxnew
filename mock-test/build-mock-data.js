'use strict';

const fs = require('fs');
const path = require('path');

const questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8'));
const papers = JSON.parse(fs.readFileSync(path.join(__dirname, 'papers.json'), 'utf8'));
const output = `window.RadioDxMockData = ${JSON.stringify({ questions, papers })};\n`;

fs.writeFileSync(path.join(__dirname, 'mock-data.js'), output);
console.log(`Built mock-data.js with ${questions.length} questions.`);
