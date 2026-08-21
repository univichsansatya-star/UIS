from django.db import models
from django.utils.text import slugify
from config.image_validation import validate_news_image


class News(models.Model):
    """News articles"""
    CATEGORY_CHOICES = [
        ('Akademik', 'Akademik'),
        ('Pengumuman', 'Pengumuman'),
        ('Prestasi', 'Prestasi'),
        ('Kegiatan', 'Kegiatan'),
        ('Penelitian', 'Penelitian'),
    ]
    
    slug = models.SlugField(unique=True, blank=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    cover_image = models.ImageField(
        upload_to='news/',
        validators=[validate_news_image],
        help_text='Wajib 1200 x 675 px, JPG/PNG/WebP. Rasio 16:9.',
    )
    published_at = models.DateTimeField(db_index=True)
    author = models.CharField(max_length=255)
    summary = models.TextField()
    content = models.TextField(help_text="Rich text/HTML content")
    video_url = models.URLField(blank=True, null=True)
    views_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-published_at']
        indexes = [
            models.Index(fields=['-published_at']),
            models.Index(fields=['category', '-published_at']),
        ]
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title


class ResearchNews(models.Model):
    """Research and LPPM news"""
    CATEGORY_CHOICES = [
        ('Penelitian', 'Penelitian'),
        ('Pengabdian Masyarakat', 'Pengabdian Masyarakat'),
        ('Jurnal & Publikasi', 'Jurnal & Publikasi'),
    ]
    
    slug = models.SlugField(unique=True, blank=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    author = models.CharField(max_length=255)
    published_at = models.DateTimeField(db_index=True)
    cover_image = models.ImageField(
        upload_to='research/',
        validators=[validate_news_image],
        help_text='Wajib 1200 x 675 px, JPG/PNG/WebP. Rasio 16:9.',
    )
    abstract = models.TextField()
    content = models.TextField(help_text="Rich text/HTML content")
    download_pdf_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-published_at']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
