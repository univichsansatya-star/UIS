# Universitas Ichsan Satya (UIS) - Django REST Backend

This is the backend API for the UIS website built with Django 5.1 and Django REST Framework.

## 🛠️ Prerequisites

- Python 3.11+
- MySQL 5.7+
- pip

## 📦 Installation

### 1. Create and Activate Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# MySQL Database
DB_NAME=uis_database
DB_USER=root
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=3306

# CORS (Frontend URL)
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### 4. Create MySQL Database

```bash
# Open MySQL client
mysql -u root -p

# Create database
CREATE DATABASE uis_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 5. Run Migrations

```bash
python manage.py migrate
```

### 6. Create Superuser

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin user.

### 7. Run Development Server

```bash
python manage.py runserver
```

The API will be available at: `http://localhost:8000/api/`

Django Admin Panel: `http://localhost:8000/admin/`

## 📡 API Endpoints

### Content (Site Configuration)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact-info/` | GET | Get contact information |
| `/api/campus-stats/` | GET | Get campus statistics |
| `/api/rector-greeting/` | GET | Get rector's greeting |
| `/api/hero-slides/` | GET | Get hero slider items |
| `/api/popup-announcement/` | GET | Get active popup announcement |

### Academics

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/fakultas/` | GET | List all faculties |
| `/api/prodi/` | GET | List all study programs |
| `/api/prodi/<slug>/` | GET | Get study program details |
| `/api/akreditasi/` | GET | List all accreditations |

### News

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/berita/` | GET | List news (supports `?category=` and `?search=` params) |
| `/api/berita/<slug>/` | GET | Get news details (increments view count) |
| `/api/lppm/` | GET | List research news (LPPM) |
| `/api/lppm/<slug>/` | GET | Get research news details |

### Public Programs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/pelatihan/` | GET | List training programs |
| `/api/pelatihan/<slug>/` | GET | Get training details |
| `/api/loker/` | GET | List job vacancies (supports `?field=` filter) |
| `/api/beasiswa/` | GET | List scholarships |
| `/api/testimoni/` | GET | List testimonials |
| `/api/download/categories/` | GET | List document categories |
| `/api/download/files/` | GET | List documents (supports `?category=` filter) |
| `/api/pedoman/` | GET | List guidelines |

### Admissions (Form Submissions)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/pmb/register/` | POST | Submit admission application |
| `/api/layanan-akademik/submit/` | POST | Submit academic services form |
| `/api/tracer-study/submit/` | POST | Submit tracer study survey |

## 📊 Admin Panel

Access the admin panel at `http://localhost:8000/admin/` to manage all content:

- **Content**: Contact info, campus stats, hero slides, popup announcements
- **Academics**: Faculties, study programs, accreditations
- **News**: News articles, research publications
- **Public Programs**: Training, jobs, scholarships, testimonials, documents, guidelines
- **Admissions**: Admission applications, academic registrations, tracer studies

## 🔍 Database Schema

### Apps and Models

**content/**
- `ContactInfo` (singleton)
- `CampusStats` (singleton)
- `RectorGreeting` (singleton)
- `HeroSlide`
- `PopupAnnouncement`

**academics/**
- `Faculty`
- `StudyProgram`
- `Accreditation`

**news/**
- `News`
- `ResearchNews`

**programs_public/**
- `Training` + `Speaker` (inline)
- `JobVacancy`
- `Scholarship`
- `Testimonial`
- `DocumentCategory` + `DocumentItem` (related)
- `GuidelineItem`

**admissions/**
- `AdmissionApplication`
- `AcademicRegistrationForm`
- `TracerStudySubmission`

## 🎨 Response Format

All API responses use **camelCase** JSON keys (configured via `djangorestframework-camel-case`).

Example:
```json
{
  "id": 1,
  "fullName": "John Doe",
  "publishedAt": "2026-08-13T10:00:00Z",
  "coverImage": "https://example.com/image.jpg",
  "careerOutlooks": ["Software Engineer", "Product Manager"]
}
```

## 🔐 CORS Configuration

The backend allows requests from the frontend development server. Configure in `.env`:

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## 📝 Creating Migrations

After modifying models, create and run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

## 🧪 Testing the API

Use tools like Postman or curl to test endpoints:

```bash
# Get contact info
curl http://localhost:8000/api/contact-info/

# Get news with filters
curl "http://localhost:8000/api/berita/?category=Akademik&search=teknologi"

# Submit admission form
curl -X POST http://localhost:8000/api/pmb/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Budi Santoso",
    "nik": "1234567890123456",
    ...
  }'
```

## 🚀 Production Deployment

For cPanel/Shared Hosting deployment:

1. Update `.env` with production settings:
   ```env
   DEBUG=False
   SECRET_KEY=your-long-random-secret-key
   ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
   DB_HOST=your-db-host
   ```

2. Run migrations on production database
3. Collect static files: `python manage.py collectstatic`
4. Configure Passenger/WSGI server according to your hosting provider

## 📚 Project Structure

```
backend/
├── config/              # Project settings
│   ├── settings.py      # Django settings (with env variables)
│   ├── urls.py          # Main URL router
│   └── wsgi.py
├── content/             # Site content & configuration
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── academics/           # Academic programs
├── news/                # News & research publications
├── programs_public/     # Training, jobs, scholarships, etc.
├── admissions/          # Application forms
├── manage.py
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (not in git)
├── .env.example         # Example configuration
└── README.md
```

## 🐛 Troubleshooting

### MySQL Connection Error
- Ensure MySQL server is running
- Check DB credentials in `.env`
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Migration Errors
```bash
# Reset migrations (development only)
python manage.py migrate admissions zero
python manage.py migrate
```

### Static Files Not Loading
```bash
python manage.py collectstatic --noinput
```

### CORS Error
- Check `CORS_ALLOWED_ORIGINS` in `.env`
- Ensure frontend URL matches exactly (including http/https and port)

## 📖 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [djangorestframework-camel-case](https://github.com/vbabiy/djangorestframework-camel-case)
- [django-solo](https://github.com/lazybird/django-solo)

## 📄 License

This project is part of Universitas Ichsan Satya's official website.
