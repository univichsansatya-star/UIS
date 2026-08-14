# 🚀 Push ke GitHub - Instruksi Lengkap

## ✅ Status Saat Ini

Git repository sudah **siap push**:

```
Branch: main ✅
Remote: https://github.com/univichsansatya-star/UIS.git ✅
Commit: 1499ef4 - "Initial commit: UIS Website Monorepo - Django Backend + React Frontend" ✅
Total Files: 116 files ✅
```

### Yang sudah dilakukan:
- ✅ Initialized git repository
- ✅ Created `.gitignore` (exclude venv, node_modules, dll)
- ✅ Commit semua 116 files
- ✅ Setup remote origin ke GitHub
- ✅ Rename branch ke `main`
- ✅ Siap push!

---

## 🔗 Cara Push ke GitHub

### Opsi 1: HTTPS dengan GitHub Token (Recommended)

**Step 1: Generate GitHub Personal Access Token**
1. Buka https://github.com/settings/tokens
2. Klik "Generate new token"
3. Pilih "Generate new token (classic)"
4. Beri nama token: `UIS-Project-Token`
5. Pilih scopes: ✓ repo (full control of private repositories)
6. Generate dan **copy token** (JANGAN tutup halaman)

**Step 2: Push dengan Token**

```bash
cd /media/gibran/EE564FF9564FC0D7/Users/IT\ PC/Desktop/projek/Uis

# Ganti YOUR_GITHUB_TOKEN dengan token dari step 1
git push -u origin main --verbose
```

Saat diminta password, paste GitHub token Anda.

**Di Windows (CMD):**
```cmd
cd D:\Users\IT PC\Desktop\projek\Uis
git push -u origin main
```

---

### Opsi 2: SSH (Jika sudah setup SSH key)

**Step 1: Change remote URL ke SSH**
```bash
git remote set-url origin git@github.com:univichsansatya-star/UIS.git
```

**Step 2: Push**
```bash
git push -u origin main
```

**Setup SSH key pertama kali:**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Paste di GitHub Settings → SSH and GPG keys → New SSH key
# https://github.com/settings/keys
```

---

### Opsi 3: Menggunakan Git Credential Manager (Windows/macOS)

Git Credential Manager otomatis handle authentication:

```bash
cd /path/to/Uis
git push -u origin main

# Browser akan buka untuk login GitHub
# Approve dan selesai!
```

---

## 📋 Troubleshooting

### ❌ Error: "CONNECT tunnel failed"

**Solusi:**
- Pastikan internet connection aktif
- Cek firewall/VPN tidak block git
- Coba dengan `--verbose` untuk lihat detail:
  ```bash
  git push -u origin main --verbose
  ```

### ❌ Error: "Authentication failed"

**Solusi:**
- Jika pakai HTTPS token:
  - Verify token masih valid (belum expire)
  - Coba generate token baru
  
- Jika pakai SSH:
  - Cek SSH key sudah di GitHub: https://github.com/settings/keys
  - Test SSH: `ssh -T git@github.com`

### ❌ Error: "Repository not found"

**Solusi:**
- Verify URL repo benar: `git remote -v`
- Pastikan Anda punya access ke repo di GitHub
- Check di GitHub bahwa repo sudah exist

### ❌ Error: "refusing to merge unrelated histories"

Tidak akan terjadi karena repo GitHub kosong. Tapi jika terjadi:
```bash
git push --force -u origin main
```

---

## ✅ Verifikasi Setelah Push

Setelah push berhasil, Anda akan lihat:

```
Counting objects: 116, done.
Delta compression using up to X threads.
Compressing objects: 100% (Y/Z), done.
Writing objects: 100% (116/116), X.XX MiB | Y.YY MiB/s, done.
Total 116 (delta 0), reused 0 (delta 0)
To https://github.com/univichsansatya-star/UIS.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Kemudian kunjungi: **https://github.com/univichsansatya-star/UIS**

Anda akan lihat semua files sudah ter-push! 🎉

---

## 🔄 Daily Git Workflow

Setelah initial push:

### Update files & push
```bash
# Edit files Anda...

# Cek perubahan
git status

# Add files yang berubah
git add .

# Commit
git commit -m "Deskripsi perubahan Anda"

# Push ke GitHub
git push
```

### Create feature branch
```bash
# Buat branch baru
git checkout -b feature/nama-fitur

# Edit files, commit
git add .
git commit -m "Add fitur baru"

# Push branch
git push origin feature/nama-fitur

# Di GitHub, buat Pull Request
```

---

## 📚 Helpful Git Commands

```bash
# Lihat history
git log --oneline

# Lihat perubahan
git diff

# Undo last commit (before push)
git reset --soft HEAD~1

# Check remote
git remote -v

# Change remote URL
git remote set-url origin NEW_URL

# Clone dari GitHub (untuk developer lain)
git clone https://github.com/univichsansatya-star/UIS.git
```

---

## 🎯 Next Steps

1. **Push ke GitHub** (gunakan Opsi 1, 2, atau 3)
2. **Verify** di https://github.com/univichsansatya-star/UIS
3. **Add collaborators** (Settings → Collaborators)
4. **Setup issues** untuk tracking tasks
5. **Create PRs** untuk development workflow

---

**Selamat! Repository Anda sudah siap untuk di-push! 🚀**

Jika ada pertanyaan, refer ke troubleshooting di atas atau baca Git documentation.
