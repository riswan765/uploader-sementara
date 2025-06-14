# 📁 Uploader Sementara ![MIT License](https://img.shields.io/badge/license-MIT-green) ![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen) ![Railway](https://img.shields.io/badge/deploy-Railway-blue)

Uploader file sederhana berbasis Node.js + Express untuk menyimpan file secara **sementara** (otomatis terhapus setelah 5 jam). Cocok untuk berbagi file cepat dan ringan.

![Preview](https://raw.githubusercontent.com/openai/placeholder/main/preview.png)

---

## 🚀 Fitur

- ✅ Upload file hingga **128MB**
- ✅ Auto hapus file setelah **5 jam**
- ✅ Riwayat upload disimpan di **localStorage (klien)**
- ✅ Statistik: total file, ukuran, upload terakhir, file terbesar
- ✅ Antarmuka bersih (Tailwind CSS + Lucide Icons)
- ✅ Backend: Express + Multer + node-fetch

---

## 📁 Struktur Proyek

```
uploader-sementara/
├── server.js
├── package.json
├── .gitignore
├── README.md
├── frontend/
│   ├── index.html
│   └── app.js
├── uploads/
```

---

## ⚙️ Cara Jalankan (Local)

```bash
git clone https://github.com/kamu/uploader-sementara.git
cd uploader-sementara
npm install
node server.js
```

Lalu buka di browser: [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploy ke Railway

1. Push semua file ke GitHub
2. Buka [https://railway.app](https://railway.app)
3. Klik **New Project** → **Deploy from GitHub Repo**
4. Pilih repo ini
5. Tunggu hingga deploy selesai

---

## ⚠️ Catatan Penting

| Hal               | Keterangan                                                  |
|------------------|-------------------------------------------------------------|
| Penyimpanan file | Hanya disimpan **sementara (5 jam)** di `uploads/`         |
| Batas file       | Max 128MB                                                   |
| Hosting gratis   | Direkomendasikan: Railway, Render, Fly.io                   |
| Tidak cocok      | Untuk file penting/permanen (karena bisa hilang kapan saja) |

---

## 📄 Lisensi

MIT License — Bebas digunakan dan dimodifikasi.

---
