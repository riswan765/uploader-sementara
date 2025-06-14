const fs = require('fs');
const path = require('path');

function cleanExpiredFiles(uploadDir, maxAgeMs = 5 * 60 * 60 * 1000) {
  const now = Date.now();
  const files = fs.readdirSync(uploadDir);
  
  files.forEach(file => {
    const timestamp = parseInt(file.split('-')[0]);
    if (!isNaN(timestamp)) {
      const expired = now - timestamp > maxAgeMs;
      if (expired) {
        const filePath = path.join(uploadDir, file);
        fs.unlink(filePath, err => {
          if (err) console.error(`❌ Gagal hapus file expired: ${file}`, err);
          else console.log(`🗑 File expired terhapus: ${file}`);
        });
      }
    }
  });
}

function startCleaner(uploadDir, intervalMs = 10 * 60 * 1000) {
  setInterval(() => {
    cleanExpiredFiles(uploadDir);
  }, intervalMs);
  console.log(`🧹 Pembersih otomatis aktif setiap ${intervalMs / 60000} menit`);
}

module.exports = { cleanExpiredFiles, startCleaner };
