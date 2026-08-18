# Task: Build Django REST Backend for Universitas Ichsan Satya (UIS) Website — Monorepo Setup

## Context

This repository currently contains a **React 19 + Vite + TypeScript** frontend (Tailwind v4) for the official website of Universitas Ichsan Satya (UIS), an Indonesian university. It was originally generated as a standalone AI Studio app and currently has **no backend** — all data comes from a static mock file at `src/lib/api/mockData.ts`, imported directly by wrapper functions in `src/lib/api/*Api.ts`.

Every wrapper function in `src/lib/api/*Api.ts` already contains a `// TODO: ganti ke -> fetch('/api/...')` comment specifying the exact intended REST endpoint. **Treat these TODO comments as the authoritative API contract.** Do not invent different endpoint paths.

## Goal

Convert this repo into a **monorepo**:
1. Move ALL existing root-level frontend files/folders (`src/`, `index.html`, `package.json`, `vite.config.ts`, `tsconfig.json`, `metadata.json`, `assets/`, `.env.example`, `.gitignore`, `README.md`) into a new `frontend/` directory. Preserve all content and relative import paths — do not modify component code unless explicitly instructed below.
2. Create a new `backend/` directory at repo root containing a Django project.
3. Add a root-level `README.md` explaining the monorepo structure and how to run both apps.

Final structure:
```
/
├── frontend/        (existing React app, moved as-is)
├── backend/         (new Django project)
└── README.md
```

## Backend Tech Stack

- **Django** (latest stable 5.x) + **Django REST Framework (DRF)**
- **MySQL** as the database for ALL environments (dev and production) — use `mysqlclient` driver. Do not default to SQLite.
- **django-cors-headers** — allow the Vite dev server origin (`http://localhost:3000`) in development.
- **djangorestframework-camel-case** — REQUIRED. All API responses MUST use camelCase JSON keys to exactly match the existing TypeScript interfaces in `frontend/src/types/index.ts` (e.g. `coverImage`, `isPublished`, `publishedAt`, `chosenProgramId`). Do not make the frontend adapt to snake_case — the backend must adapt to the frontend's existing contract.
- **Pillow** — for `ImageField` support.
- **python-dotenv** — load config from `.env` (never hardcode credentials).
- Deployment target: **shared cPanel hosting** (same pattern as an existing sibling project called "Repository UIS", which uses Phusion Passenger + `deploy.sh`). Structure `settings.py` so `DEBUG`, `ALLOWED_HOSTS`, `DATABASE`, `SECRET_KEY`, `STATIC_ROOT`, and `MEDIA_ROOT` are all environment-variable driven via `.env`, so the same codebase works locally and on cPanel without code changes. Anticipate that cPanel Passenger apps commonly serve behind a URL sub-path — keep `STATIC_URL`/`MEDIA_URL` configurable via env vars, not hardcoded to `/`.
- Media files: use Django's standard `MEDIA_ROOT`/`MEDIA_URL` local file storage (no cloud storage, no WebDAV integration for this phase).

## Data Models

Base every model strictly on the interfaces in `frontend/src/types/index.ts`. Read that file first. Build these Django apps:

### App: `content` (CMS singletons + shared site config)
- `ContactInfo` — singleton (address, phone1, phone2, whatsapp, email, pmbEmail, operationalHours, googleMapsEmbedUrl, and nested social media fields: instagram, facebook, youtube, tiktok). Use the singleton pattern (e.g. `django-solo`, or enforce via `pk=1` + `save()` override) — expose via `GET /api/contact-info`.
- `CampusStats` — singleton (studentsCount, alumniCount, studyProgramsCount, employedRatePercentage, accreditationGrade). `GET /api/campus-stats`.
- `RectorGreeting` — singleton (name, title, photo, quote, fullMessage as a list of paragraphs — use a JSONField or related model). `GET /api/rector-greeting`.
- `HeroSlide` — list, ordered (title, subtitle, image, ctaText, ctaLink, badge). `GET /api/hero-slides`.
- `PopupAnnouncement` — (title, image, description, ctaText, ctaLink, isActive). `GET /api/popup-announcement` should return the currently active one (or null).

### App: `academics`
- `Faculty` (name, slug, description, deanName, image) with related `StudyProgram` (name, slug, degree choices: D3/S1/Profesi/S2, accreditation choices, content, durationYears, careerOutlooks as JSONField/list, headOfProgram, iconName, FK to Faculty).
  - `GET /api/fakultas`
  - `GET /api/prodi`
  - `GET /api/prodi/<slug>`
- `Accreditation` (title, category choices: Institusi/Program Studi, accreditationGrade, decreeNumber, validUntil, content, image, slug).
  - `GET /api/akreditasi`

### App: `news`
- `News` (slug, title, category choices: Akademik/Pengumuman/Prestasi/Kegiatan/Penelitian, coverImage, publishedAt, author, summary, content as rich text/HTML, videoUrl optional, viewsCount).
  - `GET /api/berita?category=&search=` — filter by category and case-insensitive search across title/summary.
  - `GET /api/berita/<slug>` — also increment `viewsCount` on retrieve.
- `ResearchNews` (slug, title, category choices: Penelitian/Pengabdian Masyarakat/Jurnal & Publikasi, author, publishedAt, coverImage, abstract, content, downloadPdfUrl optional).
  - `GET /api/lppm`
  - `GET /api/lppm/<slug>`

### App: `admissions` (transactional, no public GET needed — write-only intake)
- `AdmissionApplication` (all fields from the TS interface: fullName, nik, birthPlace, birthDate, gender L/P, religion, address, phoneNumber, email, previousSchool, graduationYear, previousMajor, chosenProgramId FK to StudyProgram, fatherName, motherName, guardianName optional, parentOccupation, parentIncome). On create, generate a unique `registrationNumber` **server-side** (format `PMB-UIS-XXXXXX`, do not replicate the frontend's `Math.random()` logic — use a DB-safe unique generator).
  - `POST /api/pmb/register` → returns `{ success, registrationNumber, message }`
- `AcademicRegistrationForm` (type choices: skripsi/sidang/wisuda/camping, nim, fullName, studyProgramId FK, email, phone, thesisTitle optional, advisorName optional, academicYear optional, notes optional). Generate `ticketNo` server-side (format `REG-UIS-{TYPE}-XXXX`).
  - `POST /api/layanan-akademik/submit` → returns `{ success, ticketNo, message }`
- `TracerStudySubmission` (nim, fullName, studyProgramId FK, graduationYear, employmentStatus choices, companyName optional, jobTitle optional, firstJobTimeMonths optional, monthlySalaryRange optional, relevanceToMajor choices, feedbackForCampus).
  - `POST /api/tracer-study/submit` → returns `{ success, message }`
- Register all three models in Django Admin so staff can review submissions (list + detail view, filter by date/status/program).

### App: `programs_public` (or fold into existing apps as appropriate)
- `Training` (slug, title, subtitle, image, date, startTime, endTime, location, description, registrationLink, status choices upcoming/past, fee, quotaLeft optional) with related `Speaker` (name, role, photo, institution optional).
  - `GET /api/pelatihan`
  - `GET /api/pelatihan/<slug>`
- `JobVacancy` (title, companyName, location, field choices, description, requirements as JSONField/list, openDate, closeDate, image, isPublished, contactEmail).
  - `GET /api/loker?field=` — only return `isPublished=True`, optionally filtered by field.
- `Scholarship` (title, provider choices, image, summary, eligibility as JSONField/list, benefits as JSONField/list, deadline, isPublished).
  - `GET /api/beasiswa` — only `isPublished=True`.
- `Testimonial` (name, graduateYear, programName, currentJob, company, quote, photo).
  - `GET /api/testimoni`
- `DocumentCategory` (name) with related `DocumentItem` (title, categoryId FK, fileSize, fileType choices PDF/DOCX/XLSX, downloadUrl or FileField, updatedAt, description optional).
  - `GET /api/download/categories`
  - `GET /api/download/files?category=`
- `GuidelineItem` (title, category, targetAudience choices, fileSize, fileType PDF, downloadUrl or FileField, updatedAt).
  - `GET /api/pedoman`

## Requirements Checklist

1. All 19 GET/POST endpoints listed above must exist, matching the exact paths from the `// TODO` comments in `frontend/src/lib/api/*.ts`.
2. Every list endpoint returns a JSON array; every detail endpoint returns a single JSON object; DRF response keys are camelCase (verify via `djangorestframework-camel-case`).
3. Register **every** model in Django Admin with sensible `list_display`, `search_fields`, and `list_filter` — this is the CMS. Content editors must be able to manage all news, programs, scholarships, jobs, training, testimonials, documents, and the singleton site-config models entirely through `/admin`.
4. Add `django-cors-headers` config allowing `http://localhost:3000` in dev; make allowed origins env-driven for production.
5. Use Django's built-in `slugify` for slug fields where the frontend expects human-readable slugs (news, prodi, training, lppm).
6. Write a `requirements.txt` in `backend/` pinning all dependencies.
7. Write a `.env.example` in `backend/` documenting all required environment variables (SECRET_KEY, DEBUG, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS, STATIC_URL, MEDIA_URL).
8. Include Django migrations for all apps.
9. Do NOT modify any file inside `frontend/src/components/` or `frontend/src/types/`. You MAY later update `frontend/src/lib/api/*.ts` to point `fetch()` calls at the real backend once confirmed working — but do this only as a final, separate step after the backend is verified functional, and confirm with me before touching frontend fetch logic.
10. Provide a short `backend/README.md` with setup steps (venv, install requirements, `.env` setup, `migrate`, `createsuperuser`, `runserver`).

## Execution Order

1. Restructure the repo into `frontend/` + `backend/` first. Confirm the frontend still builds/runs unchanged from its new location before writing any Django code.
2. Scaffold the Django project and apps.
3. Implement models → migrations → serializers (camelCase) → views/viewsets → urls, one app at a time, starting with `content`, then `academics`, `news`, `programs_public`, and finally `admissions`.
4. Wire up Django Admin for every model.
5. Add CORS + `.env` + `requirements.txt` + `backend/README.md`.
6. Summarize what was built and list any endpoint where the mock data shape was ambiguous, so we can review together before touching frontend fetch calls.
