const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Lokasi penyimpanan upload dalam folder backend/uploads
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// Buat folder uploads jika belum ada
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Konfigurasi multer untuk upload file
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
  limits: { fileSize: 128 * 1024 * 1024 } // 128MB
});

// Berikan akses publik ke folder uploads jika perlu
app.use('/uploads', express.static(UPLOAD_DIR));

// Sajikan frontend statis dari ../frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Endpoint upload file
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  res.json({ success: true, file: req.file.filename });
});

// Endpoint untuk mendapatkan file yang tidak expired
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

// Fallback untuk SPA (Single Page App)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server aktif di http://localhost:${PORT}`);
});
