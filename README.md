# 🎵 Waqtify Timer - Aplikasi Fokus dengan Integrasi Spotify 🎯

## ✨ Deskripsi
Waqtify Timer adalah aplikasi produktivitas modern yang menggabungkan teknik Pomodoro dengan integrasi Spotify. Aplikasi ini dirancang untuk membantu Anda mempertahankan fokus selama sesi kerja sambil menikmati musik favorit Anda dalam antarmuka yang elegan dan intuitif.

---

## 🚀 Fitur Utama

### ⏳ Manajemen Waktu
- **Timer Pomodoro** yang dapat disesuaikan dengan sesi fokus dan istirahat.
- Pilihan durasi preset **(15, 25, dan 45 menit)**.
- 🔔 **Notifikasi audio** saat sesi selesai.
- 🎹 **Pintasan keyboard** untuk kontrol cepat.
- 📊 **Pelacakan sesi** dan statistik.

### ✅ Manajemen Tugas
- 📝 **Terintegrasi dengan daftar tugas.**
- 🎯 **Pemilihan tugas** untuk sesi fokus.
- 🔍 **Pencarian dan penyaringan cepat.**

### 🎧 Integrasi Spotify
- 🔗 **Koneksi langsung dengan akun Spotify Premium.**
- 🎵 **Pencarian dan pemutaran lagu** dalam aplikasi.
- 📂 Akses ke **daftar putar pribadi.**
- 🎶 Kontrol musik yang **disinkronkan dengan sesi fokus.**
- 🔊 Dukungan **pemutaran latar belakang.**

### 📈 Pelacakan Kemajuan
- 🎯 **Pengaturan target harian dan mingguan.**
- 📊 Statistik dan analitik **terperinci.**


---

## 🛠️ Teknologi yang Digunakan

### **Frontend**
- ⚛️ **React.js** untuk pengembangan antarmuka pengguna.
- 🛤️ **React Router** untuk navigasi.
- 🗂️ **Context API** untuk manajemen state.
- 🎨 **CSS3** dengan fitur modern seperti **Grid**, **Flexbox**, dan **CSS Variables**.
- 🛠️ **Spotify Web Playback SDK** untuk integrasi Spotify.

### **Backend**
- 🟢 **Node.js** untuk server backend.
- 🚀 **Express.js** sebagai framework API.
- 🗃️ **MariaDB** untuk penyimpanan data.
- 🔒 **JWT** untuk autentikasi.
- 🌐 Arsitektur **RESTful API**.

---

## 📦 Panduan Instalasi

### Prasyarat
- ✅ **Node.js** versi 14 atau lebih baru.
- ✅ **MariaDB** untuk database.
- ✅ Akun **Spotify Premium**.
- ✅ **Git** untuk mengelola repositori.

### 💻 Langkah Instalasi

#### 1️⃣ Klon Repositori
```bash
# Klon repositori
$ git clone https://github.com/rbwtech/waqtify-timer.git
$ cd waqtify-timer
```

#### 2️⃣ Instalasi Dependensi
Instalasi backend
```bash
$ cd backend
$ npm install

# Instalasi frontend
$ cd ../frontend
$ npm install
```

#### 3️⃣ Konfigurasi Environment
Backend (.env), rename _.env menjadi .env di dalam folder backend
```
PORT=5000
DB_HOST=localhost
DB_USER=username_database_anda
DB_PASS=password_database_anda
DB_NAME=nama_database_anda
JWT_SECRET=kunci_rahasia_jwt_anda
```
Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

#### 4️⃣ Setup Database
Import data.sql di dalam folder /data untuk membuat tabel otomatis di tabel anda
``` bash
# Jalankan backend
$ cd backend
$ npm start

# Jalankan frontend
$ cd ../frontend
$ npm run dev
atau
$ npm start
```

## 📖 Cara Penggunaan
### Daftar akun baru atau login dengan akun yang sudah ada.
- 🔗 Hubungkan akun Spotify Anda untuk mengakses musik.
- 🎯 Atur target fokus harian atau mingguan.
- ✅ Buat tugas baru atau pilih dari daftar tugas yang tersedia.
- ⏱️ Pilih durasi fokus (15, 25, atau 45 menit) dan mulai sesi.
- 🎵 Pilih musik favorit Anda dari playlist Spotify atau gunakan fitur pencarian.
- 📊 Lacak progres Anda melalui statistik dan pencapaian.
