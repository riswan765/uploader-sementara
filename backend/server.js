const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { cleanExpiredFiles, startCleaner } = require('./expired-cleaner');

const app = express();
const PORT = process.env.PORT || 3000;

const FRONTEND_DIR = path.join(__dirname, '../frontend');
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// Buat folder uploads jika belum ada
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Konfigurasi multer untuk upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${timestamp}-${safeName}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 128 * 1024 * 1024 } }); // 128MB

// Middleware untuk file statis
app.use(express.static(FRONTEND_DIR));

// Endpoint untuk upload file
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Tidak ada file' });
  res.json({ success: true, filename: req.file.filename });
});

// Endpoint daftar file yang belum expired
app.get('/files', (req, res) => {
  cleanExpiredFiles(UPLOAD_DIR); // Bersihkan sebelum kirim data
  const files = fs.readdirSync(UPLOAD_DIR);
  res.json(files);
});

// Endpoint untuk download file
app.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ success: false, message: 'File tidak ditemukan' });
  }
});

// Fallback ke index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server aktif di http://localhost:${PORT}`);
});

// Aktifkan expired cleaner background
startCleaner(UPLOAD_DIR);
