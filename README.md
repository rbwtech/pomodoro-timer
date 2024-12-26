# Waqtify Timer - Aplikasi Fokus dengan Integrasi Spotify

## Deskripsi
Waqtify Timer adalah sebuah aplikasi produktivitas modern yang menggabungkan teknik Pomodoro dengan integrasi Spotify. Aplikasi ini dirancang untuk membantu pengguna mempertahankan fokus selama sesi kerja sambil menikmati musik favorit mereka dalam antarmuka yang elegan dan intuitif.

---

## Fitur Utama

### Manajemen Waktu
- **Timer Pomodoro** yang dapat disesuaikan dengan sesi fokus dan istirahat.
- Pilihan durasi preset (15, 25, dan 45 menit).
- Notifikasi visual dan audio.
- Pintasan keyboard untuk kontrol cepat.
- Pelacakan sesi dan statistik.

### Manajemen Tugas
- Terintegrasi dengan daftar tugas.
- Pemilihan tugas untuk sesi fokus.
- Pelacakan kemajuan untuk setiap tugas.
- Pencarian dan penyaringan cepat.

### Integrasi Spotify
- Koneksi langsung dengan akun Spotify Premium.
- Pencarian dan pemutaran lagu dalam aplikasi.
- Akses ke daftar putar pribadi.
- Kontrol musik yang disinkronkan dengan sesi fokus.
- Dukungan pemutaran latar belakang.

### Pelacakan Kemajuan
- Pengaturan target harian dan mingguan.
- Pelacakan streak untuk penggunaan konsisten.
- Statistik dan analitik terperinci.
- Sistem pencapaian untuk motivasi.

---

## Teknologi yang Digunakan

### Frontend
- **React.js** untuk pengembangan antarmuka pengguna.
- **React Router** untuk navigasi.
- **Context API** untuk manajemen state.
- **CSS3** dengan fitur modern seperti Grid, Flexbox, dan CSS Variables.
- **Spotify Web Playback SDK** untuk integrasi Spotify.

### Backend
- **Node.js** untuk server backend.
- **Express.js** sebagai framework API.
- **MariaDB** untuk penyimpanan data.
- **JWT** untuk autentikasi.
- Arsitektur **RESTful API**.

---

## Panduan Instalasi

### Prasyarat
- **Node.js** versi 14 atau lebih baru.
- **MariaDB** sebagai database.
- Akun **Spotify Premium**.
- **Git** untuk mengelola repositori.

### Langkah Instalasi

#### 1. Klon Repositori
```bash
# Klon repositori
$ git clone https://github.com/username/waqtify-timer.git
$ cd waqtify-timer
```

#### 2. Instalasi Dependensi
```bash
# Instalasi backend
$ cd backend
$ npm install

# Instalasi frontend
$ cd ../frontend
$ npm install
```

#### 3. Konfigurasi Environment

##### Backend (`.env`)
```env
PORT=5000
DB_HOST=localhost
DB_USER=username_database_anda
DB_PASS=password_database_anda
DB_NAME=rbw_tech
JWT_SECRET=kunci_rahasia_jwt_anda
```

##### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

#### 4. Setup Database
Jalankan perintah berikut untuk membuat database dan tabel:
```sql
CREATE DATABASE rbw_tech;
USE rbw_tech;

-- Tabel Pengguna
CREATE TABLE waqtify_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tambahkan tabel lain sesuai kebutuhan
```

#### 5. Menjalankan Aplikasi
```bash
# Jalankan backend
$ cd backend
$ npm start

# Jalankan frontend
$ cd ../frontend
$ npm run dev
```

---

## Cara Penggunaan
1. **Daftar akun baru** atau **masuk** jika sudah memiliki akun.
2. **Hubungkan akun Spotify Premium** Anda.
3. Atur **target fokus harian/mingguan**.
4. Buat tugas atau pilih dari daftar tugas.
5. Pilih durasi fokus dan mulai sesi.
6. Pilih musik dari playlist Spotify atau cari lagu.
7. Pantau kemajuan di bagian statistik.

---
