# Prompt: Lengkapi dashboard admin UIS di django-unfold

Kamu melanjutkan migrasi admin Django UIS yang sudah setengah jalan. django-unfold sudah terpasang dan terkonfigurasi, tapi belum kelihatan hasilnya karena beberapa bagian belum tersambung. Tugasmu: sambungkan bagian yang belum jadi, dan samakan konsistensi di semua modul.

## 1. Yang sudah beres (jangan diulang/disentuh kalau tidak perlu)

- `django-unfold==0.33.0` sudah di `requirements.txt` dan `INSTALLED_APPS`.
- `config/settings.py` sudah punya dict `UNFOLD` dengan `SITE_TITLE`, `SITE_HEADER`, `SITE_SUBHEADER`, `SITE_SYMBOL: "school"`, `COLORS.primary` (palet biru sesuai brand lama: 500 `#3b82f6`, 800 navy `#1e3a8a`, 900 ink `#0f172a`), dan `DASHBOARD_CALLBACK: "config.dashboard.dashboard_callback"`.
- `config/dashboard.py` sudah ada dan berfungsi: fungsi `dashboard_callback(request, context)` menghitung `app_counts` (jumlah record per app), `total_records`, `action_counts` (dari `LogEntry`), `total_apps`, lalu inject ke context.
- `content/admin.py` sudah pakai `unfold.admin.ModelAdmin`.

## 2. Masalah yang harus diperbaiki

**A. Data dashboard sudah dihitung tapi tidak pernah ditampilkan.**
Tidak ada template dashboard custom yang mengonsumsi context dari `dashboard_callback`, jadi halaman `/admin/` cuma menampilkan default Unfold (list model per app group + tombol tambah) — persis seperti screenshot yang sudah kamu lihat, kerasa generic/template banget.

**B. Migrasi ModelAdmin baru jalan di 1 dari 5 app.**
`academics/admin.py`, `admissions/admin.py`, `news/admin.py`, `programs_public/admin.py` masih import `from django.contrib import admin` dan pakai `admin.ModelAdmin` biasa — beda base class dari `content/admin.py` yang sudah pakai `unfold.admin.ModelAdmin`.

**C. File mati yang perlu dibersihkan.**
- `static/admin/css/uis-admin.css` — sudah tidak di-load di mana pun, sisa dari implementasi CSS manual sebelumnya.
- Folder kosong `templates/admin/academics/{faculty,studyprogram,accreditation}/` — sisa scaffolding dari template lama yang sudah dihapus isinya tapi foldernya belum dihapus.

## 3. Task

### A. Bangun dashboard custom yang render data dari `dashboard_callback`
Buat override template dashboard admin (`templates/admin/index.html` atau sesuai konvensi Unfold untuk custom dashboard — cek https://unfoldadmin.com/docs/configuration/dashboard/ untuk pola resmi component-nya: `card.html`, `text.html`, `title.html`, dsb, karena syntax komponen ini spesifik per versi package, jangan ditebak-tebak).

Konten yang perlu ditampilkan (datanya sudah tersedia di context, tinggal dirender):
- Welcome panel singkat: sapaan ke user + deskripsi singkat.
- Grid KPI/stat card (pakai komponen card bawaan Unfold, bukan HTML custom): "Modul aktif" (`total_apps`), "Total record" (`total_records`), "Aktivitas" (jumlah dari `action_counts`), dan satu lagi opsional jumlah user admin aktif.
- Distribusi record per modul dari `app_counts` — list/bar sederhana per app, urut dari terbesar.
- Aktivitas terbaru — bisa reuse `{% get_admin_log %}` template tag Django standar (seperti sebelumnya) untuk daftar log entry terakhir, ditampilkan dengan komponen Unfold.
- Quick action shortcut ke 4 tempat yang paling sering dipakai: tambah berita, cek pendaftar, data akademik, kelola pengguna (URL name-nya sudah ada di project, cari yang sesuai lewat `{% url %}`).

Gaya visual: flat, card putih dengan border tipis, tanpa gradient tebal — ikuti bahasa visual Unfold yang sudah jalan sekarang (light, bersih, aksen biru dari `COLORS.primary`), jangan bawa balik gradient/hero gelap dari desain lama.

### B. Samakan semua ModelAdmin ke Unfold
Di `academics/admin.py`, `admissions/admin.py`, `news/admin.py`, `programs_public/admin.py`: ganti
```python
from django.contrib import admin
```
jadi menambahkan
```python
from unfold.admin import ModelAdmin
```
lalu ubah semua class admin di file itu supaya inherit dari `ModelAdmin` (Unfold) alih-alih `admin.ModelAdmin`. Jangan ubah `list_display`, `list_filter`, `search_fields`, `fieldsets`, atau logic lain yang sudah ada — cukup ganti base class-nya, ikuti pola yang sudah dipakai di `content/admin.py`.

### C. Bersih-bersih
- Hapus `static/admin/css/uis-admin.css` (pastikan memang tidak ada `{% static %}` reference ke file ini di manapun sebelum dihapus).
- Hapus folder kosong `templates/admin/academics/faculty/`, `templates/admin/academics/studyprogram/`, `templates/admin/academics/accreditation/` beserta parent `templates/admin/academics/` kalau sudah kosong total.

### D. Opsional, kalau ada waktu lebih
- Tambah config `SIDEBAR` di `UNFOLD` dict untuk kasih icon per grup app di sidebar (Material Symbols: `school` untuk Academics, `assignment` untuk Admissions, `article` untuk Content/News, `group` untuk Autentikasi dan Otorisasi) — cek https://unfoldadmin.com/docs/configuration/sidebar/ untuk formatnya.
- Kalau ada file logo resmi UIS (SVG/PNG) yang bisa dipakai, set `SITE_LOGO` supaya identitasnya lebih kuat dari sekadar icon "school". Kalau tidak ada asetnya, biarkan `SITE_SYMBOL` seperti sekarang, tidak perlu maksa bikin logo baru.

## 4. Definition of done
- Halaman `/admin/` menampilkan dashboard custom (KPI card, distribusi per modul, aktivitas terbaru, quick action) — bukan lagi default app-list Unfold.
- Semua 5 app (`academics`, `admissions`, `content`, `news`, `programs_public`) konsisten pakai `unfold.admin.ModelAdmin`.
- Tidak ada file/folder mati tersisa (`uis-admin.css`, folder template academics kosong).
- Tampilan tetap flat/bersih, konsisten sama gaya Unfold yang sudah ada, tidak ada gradient/hero berat yang clash.

## 5. Referensi resmi
- Dashboard custom: https://unfoldadmin.com/docs/configuration/dashboard/
- Sidebar config: https://unfoldadmin.com/docs/configuration/sidebar/
- Settings umum: https://unfoldadmin.com/docs/configuration/settings/
