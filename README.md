# Neuro Sleep - Sleep Disorder Dagnosis

Aplikasi ini bertujuan untuk membantu Anda memahami pola tidur dan mengidentifikasi potensi gangguan tidur seperti Insomnia atau Sleep Apnea sebelum berdampak pada kehidupan sehari-hari. Dengan memasukkan data sederhana mengenai kebiasaan harian, aktivitas fisik, tanda vital, dan durasi tidur, aplikasi ini memberikan wawasan yang akurat dan personal tentang kesehatan tidur Anda dalam waktu singkat. Berdasarkan hasil ini, Anda dapat mengambil langkah-langkah yang tepat untuk memperbaiki kualitas tidur, meningkatkan energi, dan meningkatkan kesejahteraan secara keseluruhan.

Masalah yang diselesaikan:
1. Banyak orang mengalami gangguan tidur seperti insomnia atau sleep apnea tanpa menyadari gejala-gejalanya. Mendiagnosis gangguan tidur seringkali membutuhkan waktu lama dan harus dilakukan oleh profesional medis, yang mungkin tidak selalu mudah diakses.
2. Banyak orang tidak sadar akan pola tidur mereka yang buruk atau kebiasaan yang dapat menyebabkan gangguan tidur.
3. Tidak semua orang memiliki akses mudah ke ahli tidur atau layanan kesehatan tidur, terutama di daerah yang kurang memiliki fasilitas medis.

# Anggota Kelompok 4

221111320 - Nadiyah Shofa Salsabila

221110837 - Callisto Carlos

221110500 - Andrew Sachio Chiwira

221112843 - Cecillia Charlene

# Arsitektur & Teknologi

[Frontend UI (React)] <-> [Backend API (Flask)] <-> [Database (MySQL)] <-> [DevOps (Docker Container)]

Teknologi yang digunakan:
1. Bahasa Pemrograman: Python, JavaScript
2. Framework: Flask (untuk backend), React (untuk frontend)
3. Database: MySQL
4. Tools dan Pustaka:
   - Flask
   - Flask-Cors
   - python-dotenv
   - mysql-connector-python
   - joblib
   - numpy
   - scikit-learn
5. DevOps: Docker (untuk containerization dan deployment)

# Petunjuk Instalasi Lokal (Wajib via Docker)

### 1. Clone Repository
```bash
git clone https://github.com/NadiyahShofaSalsabila/Kelompok4-NeuroSleep.git
```
atau
download kode aplikasi melalui google drive https://drive.google.com/drive/folders/1_byay9vNOLPnuxcUT6R3vtp3sYsPTxpQ?usp=sharing

### 2. Konfigurasi `.env`
Buat file `.env` di root folder dengan isi seperti berikut:

```env
SECRET_KEY=your_secret_key_here

BACKEND_PORT=your_backend_port
FRONTEND_PORT=your_frontend_port

DB_HOST=your_database_host
DB_PORT=your_database_port
DB_DATABASE=your_database_name
DB_USERNAME=your_sql_username
DB_PASSWORD=your_sql_password

REACT_APP_API_URL=your_backend_host_(backend_port_optional)
```
atau bisa menggunakan perintah berikut:
```bash
cp .env.example .env
```

### 3. Jalankan Docker
```bash
docker-compose up --build
```

### 4. Jalankan website

http://localhost:3000 (Silahkan akses langsung di browser anda jika sudah berhasil melakukan instalasi lokal)

# Petunjuk Penggunaan Aplikasi

1. Lakukan register jika anda belum memiliki akun.
2. Jika sudah, login dengan memasukkan username dan password anda.
3. untuk melakukan prediksi isi data anda sesuai dengan tabel yang diminta.
4. setelah semua tabel diisi dengan data yang benar lakukan predict, lalu hasil diagnosa akan tampak di halaman atas.
5. jika anda login sebagai admin, melalui halaman history anda bisa melihat seluruh history diagnosa yang pernah dilakukan oleh seluruh pasien, dan anda juga bisa menghapusnya.

# URL Aplikasi Live

http://202.10.48.112:3000/ (Silahkan akses langsung di browser anda)

