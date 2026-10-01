# Final Project Bootcamp Cypress AfterOffice Batch #1

## 📌 Deskripsi
Project ini berisi E2E automation testing menggunakan **Cypress** untuk 3 website:
- **Agoda** (flow pemesanan tiket flight)
- **Amazon** (flow pencarian barang)
- **YouTube** (flow pencarian video trending)

Project menggunakan:
- **Page Object Model (POM)**
- **Environment Variables**
- Dokumentasi hasil test dalam bentuk **video bawaan Cypress** dan **HTML report**
- Opsional: **GitHub Actions (CI/CD)**

---

## 🛠️ Struktur Folder
cypress-projects/
│
├── agoda/
│   └── cypress/e2e/...
├── amazon/
│   └── cypress/e2e/...
├── youtube/
│   └── cypress/e2e/...
└── README.md

---

## 🚀 Test Flow

### Agoda
- Pesan tiket flight dari **Jakarta → Singapura**
- Pilih penerbangan paling awal untuk besok (contoh: jika hari ini 25 May, pilih 26 May)
- Maskapai: **Malaysia Airlines**
- Isi data penumpang di halaman passenger detail
- **Expectations:**
  - Total price dan data penumpang sesuai dengan input
  - Departure & arrival time sesuai dengan pilihan
  - Validasi dilakukan di halaman pembayaran (tanpa perlu bayar)

### Amazon
- Gunakan viewport **1920x1080**
- Search item: **chair**
- Urutkan berdasarkan **Harga termahal**
- Pilih item paling kanan dari barisan pertama (bukan iklan)
- **Expectations:**
  - Nama barang dan harga sesuai dengan yang muncul di search page  
  - Harga cukup sampai digit satuan (tanpa sen)

### YouTube
- Pilih menu **Gaming** di sidebar
- Masuk ke halaman **Trending videos** → klik **View All**
- Pilih video trending nomor 3
- **Expectations:**
  - Title dan channel sesuai dengan yang muncul di page trending

---

## 📄 Cara Menjalankan
1. Clone repo:
   ```bash
   git clone https://github.com/<username>/cypress-automation-final.git
   cd cypress-automation-final
2. Install dependencies:
    npm install
3. Jalankan test:
    npx cypress open

📊 Dokumentasi
Video hasil run otomatis tersimpan di folder cypress/videos/

HTML report tersimpan di folder cypress/reports/

🤝 Kontributor
Samuel – Final Project Bootcamp Cypress AfterOffice Batch #1