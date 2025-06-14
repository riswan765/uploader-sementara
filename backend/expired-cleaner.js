const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(__dirname, 'uploads');
const EXPIRY_MS = 5 * 60 * 60 * 1000; // 5 jam

function cleanExpiredFiles() {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) return console.error('Gagal membaca folder upload:', err);

    const now = Date.now();

    files.forEach(file => {
      const filePath = path.join(UPLOAD_DIR, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return console.error('Gagal membaca file:', err);

        const age = now - stats.ctimeMs;
        if (age > EXPIRY_MS) {
          fs.unlink(filePath, err => {
            if (err) console.error('Gagal hapus file:', file);
            else console.log('File expired dihapus:', file);
          });
        }
      });
    });
  });
}

// Jalankan pembersihan langsung saat file ini dijalankan
cleanExpiredFiles();