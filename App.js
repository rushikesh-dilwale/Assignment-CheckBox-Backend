const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
app.use(express.json());


const wordData = [
  { word: 'Aggrandize', sentence: 'A generous grant enabled the library to significantly aggrandize its collection of books on tape.' },
  { word: 'Iconoclast', sentence: 'Notorious as an iconoclast, that music critic isn\'t afraid to go after sacred cows.' },
  { word: 'Libertarian', sentence: 'This pinpoints a fundamental weakness in the libertarian defense of a market economy.' },
  { word: 'Licentious', sentence: 'A moralist who decried what she regarded as the licentious and corrupt culture of the entertainment industry.' },
  { word: 'Pejorative', sentence: 'While the detective was supposed to be neutral, he described the suspect in a pejorative manner.' },
  { word: 'Recalcitrant', sentence: 'For anyone who has ever struggled to extract a recalcitrant cork from a bottle... the value of a good corkscrew is a given.' },
  { word: 'Solipsism', sentence: 'Dressing for me has often been a mixture of safe and pleasurable solipsism, alongside a process of curating something interesting.' },
  { word: 'Ubiquitous', sentence: 'Apple is working to make Siri a little more ubiquitous, and to that end, is finally opening Siri up to third-party devices.' },
  { word: 'Mendacious', sentence: 'What we see, hear, smell and touch is not necessarily mendacious; it\'s the conclusions we draw from those observations that may be inaccurate.' },
  { word: 'Rebut', sentence: 'The above data of word and sentence stored in a table. There will be 100 such records, so create it in the backend, store it, and then send it to the frontend.' }
];


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/api/words', (req, res) => {
  res.json(wordData);
});

app.post('/api/generate-pdf', (req, res) => {
  const selectedWords = req.body.selectedWords;

  const doc = new PDFDocument();

  selectedWords.forEach((selectedWord) => {
    const wordEntry = wordData.find((entry) => entry.word === selectedWord);
    if (wordEntry) {
      doc.fontSize(14).text(`Word: ${wordEntry.word}`, { continued: true });
      doc.fontSize(12).text(`Sentence: ${wordEntry.sentence}`);
      doc.moveDown();
    }
  });

  const pdfPath = 'selected_words.pdf';
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.end();

  res.setHeader('Content-Disposition', 'attachment; filename="selected_words.pdf"');
  res.setHeader('Content-Type', 'application/pdf');
  fs.createReadStream(pdfPath).pipe(res);
});

const port = 3001; 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
