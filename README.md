# 📤 Uploader Sementara

Uploader sementara adalah aplikasi web sederhana untuk menyimpan file secara sementara dengan auto-expired dalam waktu **5 jam**. Cocok digunakan untuk berbagi file besar sementara antar perangkat.

---

## 🚀 Fitur

- ✅ Upload file hingga **128MB**
- ⏳ File otomatis **expired setelah 5 jam**
- 📁 Riwayat upload tersimpan di **localStorage**
- 📊 Statistik upload lokal (total file, ukuran, terbesar, dsb)
- 💡 Tampilan modern menggunakan **Tailwind CSS** + **Lucide Icons**
- ⚙️ Backend ringan berbasis **Node.js + Express + Multer**

---

## 📦 Struktur Proyek

uploader-sementara/ ├── server.js            # Backend utama ├── package.json         # Info dependensi dan script ├── .gitignore ├── README.md ├── frontend/            # UI dan logic sisi klien │   ├── index.html │   └── app.js ├── uploads/             # Folder penyimpanan file (dibuat otomatis)

---

## ⚙️ Cara Jalankan (Local)

1. Clone repo:

```bash
git clone https://github.com/kamu/uploader-sementara.git
cd uploader-sementara

2. Install dependency:

npm install

3. Jalankan server:

node server.js

4. Buka di browser:

http://localhost:3000

--

☁️ Deploy ke Railway

1. Push semua file ke GitHub


2. Buka https://railway.app


3. Klik New Project → Deploy from GitHub Repo


4. Pilih repo ini


5. Tunggu hingga deploy selesai




---

⚠️ Catatan Penting

Hal	Keterangan

Penyimpanan file	Hanya disimpan sementara (5 jam) di uploads/
Batas file	Max 128MB
Hosting gratis	Direkomendasikan: Railway, Render, Fly.io
Tidak cocok	Untuk file penting/permanen (karena bisa hilang kapan saja)



---

📸 Screenshot






---

📄 Lisensi

MIT License — Bebas digunakan dan dimodifikasi.


---

🙋‍♂️ Kontribusi / Pertanyaan

Silakan buka Issues atau hubungi saya via GitHub jika ada pertanyaan, ide, atau bug.

---
