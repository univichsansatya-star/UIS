# Task: Add Institutional Content Models (Phase 1 of 6)

## Context

`backend/content/` already has a working pattern for this exact kind of data:
- Singleton sections (one record only, edited in-place): `ContactInfo`, `CampusStats`, `RectorGreeting`
- Ordered list sections (multiple records, admin can add/reorder): `HeroSlide`, `PopupAnnouncement`

Follow those two patterns EXACTLY — same file structure, same import style, same
`UnfoldSingletonModelAdmin` base class, same `ReadOnlyModelViewSet` for lists. Do not invent a
new pattern. Read `content/models.py`, `content/admin.py`, `content/serializers.py`,
`content/views.py`, `content/urls.py` first before writing anything.

Add 4 new things to the `content` app (same app, do not create a new Django app):

## 1. `CampusProfile` — ordered list model (like `HeroSlide`)

Replaces the old CMS "profil" section-tabs system (Sejarah, Fasilitas, dst — dynamic tabs an
admin can add). Fields: `title` (CharField 255), `slug` (SlugField, unique), `content`
(TextField, rich text), `order` (IntegerField, default 0). Meta ordering = `['order']`.

## 2. `VisionMission` — singleton (like `RectorGreeting`, no image field needed)

Fields: `vision` (TextField), `missions` (JSONField, default=list, help_text="List of mission
point strings").

## 3. `VideoTour` — singleton

Fields: `title` (CharField 255), `youtube_embed_url` (URLField), `description` (TextField,
blank=True).

## 4. `RunningQuote` — ordered list model (like `HeroSlide`, no image)

For the running-text ticker. Fields: `text` (CharField 300), `author` (CharField 150,
blank=True), `order` (IntegerField, default 0). Meta ordering = `['order']`.

## For all 4 models, mirror the existing app structure:

- **models.py**: add the 4 classes above to `content/models.py`.
- **serializers.py**: add a `ModelSerializer` for each, same style as `HeroSlideSerializer`/`RectorGreetingSerializer`.
- **admin.py**: register `CampusProfile` and `RunningQuote` as `ModelAdmin` with `list_display`
  including `order`, `list_editable = ('order',)` — copy `HeroSlideAdmin` exactly. Register
  `VisionMission` and `VideoTour` as `UnfoldSingletonModelAdmin` — copy `CampusStatsAdmin` exactly.
- **views.py**: `CampusProfile` and `RunningQuote` → `ReadOnlyModelViewSet` (copy
  `HeroSlideViewSet`). `VisionMission` and `VideoTour` → single `@api_view(['GET'])` function
  returning 404 if not created yet (copy `rector_greeting` view exactly, including its
  try/except shape).
- **urls.py**: register routes as `campus-profile/`, `vision-mission/`, `video-tour/`,
  `running-quotes/` — same router-registration style already used in `content/urls.py`.

## Constraints

- Do not touch `academics/`, `news/`, `admissions/`, `programs_public/`, or any `frontend/` file — backend `content` app only, this phase.
- Do not modify `ContactInfo`, `CampusStats`, `RectorGreeting`, `HeroSlide`, `PopupAnnouncement` — only add new code.
- After adding models, run `python manage.py makemigrations content` and show me the migration file before applying it — do not run `migrate` yet.

## Acceptance checklist

- [ ] 4 new model classes in `content/models.py`, no changes to existing ones
- [ ] Admin pages for all 4 appear correctly styled in django-unfold (singleton ones cannot be added twice, list ones show drag-orderable `order` column)
- [ ] `GET /api/campus-profile/`, `/api/vision-mission/`, `/api/video-tour/`, `/api/running-quotes/` all return valid JSON via `python manage.py runserver` + curl
- [ ] Migration file created but NOT applied yet (I'll review it first)
