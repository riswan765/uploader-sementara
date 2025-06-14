const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cleaner = require('./expired-cleaner'); // pastikan file ini ada

const app = express();
const PORT = 3000;

const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Setup multer
const upload = multer({
  storage,
  limits: { fileSize: 128 * 1024 * 1024 } // Max 128MB
});

// Middleware
app.use(cors());
app.use(express.static(UPLOAD_DIR)); // akses file via URL langsung

// Endpoint upload
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded.' });

  res.json({
    filename: file.filename,
    originalname: file.originalname,
    size: file.size,
    url: `${req.protocol}://${req.get('host')}/${file.filename}`,
    uploadedAt: Date.now()
  });
});

// Auto-clean file expired setiap 10 menit
setInterval(() => {
  console.log('[Cleaner] Mengecek file expired...');
  cleaner.cleanExpiredFiles();
}, 10 * 60 * 1000); // 10 menit

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
