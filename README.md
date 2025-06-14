# 📁 Uploader Sementara

Project simpel buat upload file sementara (max 128MB), nanti bakal auto kehapus setelah 5 jam. Gak perlu database, semua disimpan lokal aja. Cocok buat sharing cepat antar device atau teman.

![Preview](preview.png)

---

## ✨ Fitur

- ✅ Upload file sampe 128MB
- ⏱ File auto expired 5 jam
- 💾 Riwayat disimpan di browser (localStorage)
- 📊 Statistik upload: total file, total ukuran, terakhir upload, file terbesar
- 🎨 UI simpel pakai Tailwind CSS
- 🔧 Backend pakai Node.js + Express + Multer

---

## 🚀 Cara Pakai

1. Clone repo ini
```bash
git clone https://github.com/riswan/uploader-sementara.git
```

2. Masuk ke folder project dan install dependencies
```bash
cd uploader-sementara
npm install
```

3. Jalanin server
```bash
node server.js
```

4. Akses via browser:
```
http://localhost:3000
```

---

## 🗂 Struktur Folder

```
.
├── frontend/
│   ├── index.html
│   ├── app.js
├── uploads/
├── server.js
└── package.json
```

---

## ⏱ Sistem Expired

Setiap file yang diupload bakal auto kehapus setelah 5 jam. Dicek pakai script di backend yang jalan tiap request (atau bisa pakai cron job di hosting).

---

## 📦 Bisa Di-deploy ke

- Railway ✅
- Render ✅
- Fly.io ✅

---

## 🙋 Tentang

Dibuat sama **Riswan**  
📸 IG: [@riswan.dev](https://instagram.com/riswan.dev)  
📧 Email: riswan@example.com
