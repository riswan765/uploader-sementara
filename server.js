
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const name = `${timestamp}-${file.originalname}`;
    cb(null, name);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 128 * 1024 * 1024 }, // 128MB
});

app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ success: true, file: req.file.filename });
});

app.get('/files', (req, res) => {
  const now = Date.now();
  const files = fs.readdirSync(UPLOAD_DIR).filter(file => {
    const timestamp = parseInt(file.split('-')[0]);
    const isExpired = now - timestamp > 5 * 60 * 60 * 1000;
    if (isExpired) fs.unlinkSync(path.join(UPLOAD_DIR, file));
    return !isExpired;
  });
  res.json(files);
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
