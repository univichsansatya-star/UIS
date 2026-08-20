# Prompt: Migrasi Django Admin UIS ke django-unfold

Kamu bekerja di repo Django 5 + DRF untuk sistem informasi Universitas Ichsan Satya (UIS). Tugasmu: memperbaiki tampilan Django admin yang saat ini rusak/berantakan, dengan cara migrasi ke theme **django-unfold**, mencakup **semua modul admin**, sambil mempertahankan identitas visual (branding) UIS yang sudah ada.

## 1. Konteks masalah (sudah terdiagnosis, jangan diinvestigasi ulang dari nol)

Tampilan admin saat ini setengah jadi karena:

- `templates/admin/index.html` me-load `{% static 'admin/css/dashboard.css' %}`, padahal file `dashboard.css` **tidak ada** di project ini. Request-nya gagal diam-diam (404), sehingga section "Database Overview", "Audit Events", "Aktivitas sistem", "Module section", dan "Activity panel" tampil tanpa styling sama sekali (teks polos menumpuk).
- Satu-satunya file CSS yang ada, `static/admin/css/uis-admin.css`, hanya mendefinisikan sebagian kecil class yang dipakai template: navbar, brand/logo, welcome panel (sebagian), `.uis-stat-card` (cuma varian warna biru, padahal template pakai 4 varian warna), dan action-card. Puluhan class lain yang dipakai template (`uis-eyebrow`, `uis-section-heading`, `uis-chart-card`, `uis-bar-*`, `uis-donut*`, `uis-legend`, `uis-dashboard-columns`, `uis-module-section`, `uis-activity-*`, `uis-empty-state`, dll) tidak pernah didefinisikan.
- Pola yang sama terjadi di 3 halaman changelist Academics (`templates/admin/academics/{faculty,studyprogram,accreditation}/change_list.html`) — pakai class `academics-shell`, `academics-hero`, `academics-hero-stat`, `academics-tabs` yang juga tidak pernah didefinisikan di manapun.
- `templates/admin/base_site.html` juga meng-inject Tailwind lewat CDN browser build (`@tailwindcss/browser@4`, JIT compiler yang jalan di browser) padahal cuma dipakai di satu tempat kecil. Ini overhead yang tidak perlu dan bukan untuk production.

**Keputusan yang sudah diambil:** daripada menambal CSS custom yang bolong satu per satu (berisiko terulang di app lain), kita pindah ke **django-unfold** sebagai basis theme admin, lalu skin ulang dengan warna/branding UIS di atasnya.

## 2. Batasan lingkungan (penting, jangan diabaikan)

- Deployment production ada di **cPanel shared hosting (Niagahoster, server srv182)**, akses via SSH jailshell, Node.js diaktifkan lewat venv terpisah, build artifact di-upload manual karena keterbatasan resource server.
- **Jangan tambahkan pipeline build Node/Tailwind CLI baru.** django-unfold sudah ship CSS Tailwind precompiled di dalam package-nya, jadi tidak perlu proses build tambahan — cukup `pip install` + `collectstatic` seperti alur yang sudah ada.
- Django versi 5, backend memakai DRF, monorepo dengan frontend React terpisah (frontend tidak terpengaruh perubahan ini, fokus hanya di sisi Django admin/backend).

## 3. Task yang harus dikerjakan

### A. Install & aktivasi django-unfold
- Tambahkan `django-unfold` ke `requirements.txt` (sesuaikan versi yang kompatibel dengan Django 5).
- Tambahkan `"unfold"` di `INSTALLED_APPS` pada `config/settings.py`, **diletakkan sebelum** `"django.contrib.admin"`. Cek dokumentasi resmi apakah app tambahan seperti `unfold.contrib.filters` dibutuhkan untuk fitur filter lanjutan yang kita pakai.
- Pastikan `TEMPLATES[0]['DIRS']` sudah mengarah ke folder `templates/` project (cek konfigurasi yang sudah ada di `config/settings.py`).

### B. Bersihkan sisa implementasi lama
- Hapus reference ke `admin/css/dashboard.css` di `templates/admin/index.html` (file yang tidak pernah ada).
- Hapus script Tailwind CDN (`@tailwindcss/browser@4`) dari `templates/admin/base_site.html`.
- `static/admin/css/uis-admin.css` boleh dipertahankan sementara sebagai referensi warna/token (lihat bagian D), tapi jangan di-load lagi sebagai stylesheet utama admin — nanti brand color dipindah ke config `UNFOLD["COLORS"]`.
- 3 file `change_list.html` di Academics (faculty/studyprogram/accreditation) yang pakai class custom broken (`academics-shell`, dst) perlu dirombak memakai komponen/tab navigation bawaan Unfold, bukan HTML+class manual.

### C. Konfigurasi branding di `UNFOLD` settings dict
Tambahkan dict `UNFOLD` di `config/settings.py`. Minimal isi:
- `SITE_TITLE`: "UIS Admin"
- `SITE_HEADER`: "UIS Administration"
- `SITE_SUBHEADER`: "Universitas Ichsan Satya"
- `SITE_ICON` / `SITE_SYMBOL`: logo mark "UIS" (bisa reuse asset yang sama dengan `.uis-admin-mark` di CSS lama)
- `COLORS`: gunakan palet biru-navy yang sudah ada sebagai referensi:
  - navy/ink: `#0f172a`, `#1e293b`
  - primary blue: `#3b82f6` (hover `#1d4ed8`)
  - cyan accent: `#06b6d4`
  - success `#10b981`, warning `#f59e0b`, danger `#ef4444`
  - Cek dokumentasi resmi Unfold untuk format value yang tepat sesuai versi yang terinstall (format berbeda-beda antar versi: hex, RGB space-separated, atau oklch) — jangan asal tebak formatnya, sesuaikan dengan apa yang diminta versi package saat ini.
- Font: pertahankan "Plus Jakarta Sans" via `STYLES` config kalau Unfold mendukung custom font injection, atau override lewat `STYLES`/custom CSS kecil.
- Referensi resmi: https://unfoldadmin.com/docs/configuration/settings/ dan https://unfoldadmin.com/docs/configuration/colors/

### D. Rebuild dashboard admin (halaman index)
- Manfaatkan `DASHBOARD_CALLBACK` di config `UNFOLD` untuk inject data custom ke dashboard, reuse logic yang sudah ada di `config/context_processors.py` (fungsi `admin_metrics`: hitung jumlah record per app, action counts dari `LogEntry`).
- Rekonstruksi konsep dashboard yang sudah ada (welcome panel, 4 stat card: Modul Aktif/Akses/Status Sistem/Aksi Cepat, quick action shortcuts ke `news_news_add`, `admissions_admissionapplication_changelist`, `academics_faculty_changelist`, `auth_user_changelist`, dan activity log terbaru) memakai komponen dashboard bawaan Unfold (card/KPI widget), bukan HTML mentah seperti sebelumnya.
- Ikuti pola resmi di https://unfoldadmin.com/docs/configuration/dashboard/ untuk cara override template dashboard dan compose komponen dengan benar.

### E. Terapkan Unfold ke semua ModelAdmin di semua app
Unfold butuh `ModelAdmin` di tiap app diganti importnya dari `unfold.admin.ModelAdmin` (bukan `django.contrib.admin.ModelAdmin`) supaya form/changelist ikut ter-style penuh. Update `admin.py` di app-app berikut:
- `academics`
- `admissions`
- `content`
- `news`
- `programs_public`
- (cek juga apakah user/group admin bawaan Django perlu disesuaikan untuk konsistensi)

Untuk tiap `ModelAdmin`, ganti:
```python
from django.contrib import admin
```
menjadi memakai
```python
from unfold.admin import ModelAdmin
```
dan pastikan class admin masing-masing model inherit dari `ModelAdmin` versi Unfold ini. Jangan ubah logic `list_display`, `list_filter`, `search_fields`, dsb yang sudah ada — cukup ganti base class-nya.

### F. Verifikasi
- Jalankan `python manage.py collectstatic` dan pastikan tidak ada static file yang error/hilang.
- Test lokal via `runserver` di `127.0.0.1:8000/admin/`, cek semua modul (Academics, Admissions, Content, News, Programs Public, Auth) tampil konsisten, tidak ada lagi bagian yang polos tanpa styling.
- Pastikan seluruh link "Aksi cepat" dan permission/URL admin existing masih berfungsi normal (tidak ada perubahan behavior, hanya tampilan).
- Cek tampilan di breakpoint mobile juga (Unfold sudah responsive by default, tapi tetap perlu dicek).

## 4. Definition of done
- Tidak ada lagi request ke file CSS yang tidak ada (`dashboard.css`).
- Semua halaman admin (dashboard + seluruh changelist/changeform di semua app) tampil konsisten dengan theme Unfold, tidak ada section polos tanpa styling.
- Warna/branding UIS (navy-blue gradient, nama "UIS Administration") tetap terlihat, bukan default theme generik.
- Tidak ada dependency Node/Tailwind CLI build baru yang ditambahkan ke pipeline deploy.
- `requirements.txt` terupdate dengan `django-unfold`.

## 5. Referensi resmi
- Docs: https://unfoldadmin.com/docs/
- GitHub: https://github.com/unfoldadmin/django-unfold
- Contoh dashboard custom: https://unfoldadmin.com/docs/configuration/dashboard/
