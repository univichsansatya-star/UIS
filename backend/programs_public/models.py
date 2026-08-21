from django.db import models
from django.utils.text import slugify
from config.image_validation import validate_card_image, validate_square_photo, validate_training_image


class Training(models.Model):
    """Training and workshop programs"""
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('past', 'Past'),
    ]
    
    slug = models.SlugField(unique=True, blank=True)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    image = models.ImageField(
        upload_to='training/',
        validators=[validate_training_image],
        help_text='Wajib 1200 x 675 px, JPG/PNG/WebP. Rasio 16:9.',
    )
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=255)
    description = models.TextField()
    registration_link = models.URLField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    fee = models.CharField(max_length=100)
    quota_left = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-date']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title


class Speaker(models.Model):
    """Speakers for training"""
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    photo = models.ImageField(
        upload_to='speakers/',
        validators=[validate_square_photo],
        help_text='Wajib 600 x 600 px, JPG/PNG/WebP. Foto square 1:1.',
    )
    institution = models.CharField(max_length=255, blank=True, null=True)
    training = models.ForeignKey(Training, on_delete=models.CASCADE, related_name='speakers')
    
    def __str__(self):
        return self.name


class JobVacancy(models.Model):
    """Job vacancies"""
    FIELD_CHOICES = [
        ('Keperawatan', 'Keperawatan'),
        ('Kebidanan', 'Kebidanan'),
        ('Farmasi', 'Farmasi'),
        ('Teknologi Informasi', 'Teknologi Informasi'),
        ('Manajemen Rumah Sakit', 'Manajemen Rumah Sakit'),
        ('Umum', 'Umum'),
    ]
    
    title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    field = models.CharField(max_length=50, choices=FIELD_CHOICES)
    description = models.TextField()
    requirements = models.JSONField(default=list, help_text="List of requirements")
    open_date = models.DateField()
    close_date = models.DateField()
    image = models.ImageField(
        upload_to='jobs/',
        validators=[validate_card_image],
        help_text='Wajib 1200 x 800 px, JPG/PNG/WebP. Rasio 3:2.',
    )
    is_published = models.BooleanField(default=True)
    contact_email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-close_date']
    
    def __str__(self):
        return self.title


class Scholarship(models.Model):
    """Scholarship opportunities"""
    PROVIDER_CHOICES = [
        ('KIP-Kuliah', 'KIP-Kuliah'),
        ('Yayasan Ichsan Satya', 'Yayasan Ichsan Satya'),
        ('Pemerintah Daerah', 'Pemerintah Daerah'),
        ('Mitra Industri', 'Mitra Industri'),
    ]
    
    title = models.CharField(max_length=255)
    provider = models.CharField(max_length=100, choices=PROVIDER_CHOICES)
    image = models.ImageField(
        upload_to='scholarships/',
        validators=[validate_card_image],
        help_text='Wajib 1200 x 800 px, JPG/PNG/WebP. Rasio 3:2.',
    )
    summary = models.TextField()
    eligibility = models.JSONField(default=list, help_text="List of eligibility criteria")
    benefits = models.JSONField(default=list, help_text="List of benefits")
    deadline = models.DateField()
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-deadline']
    
    def __str__(self):
        return self.title


class Testimonial(models.Model):
    """Alumni testimonials"""
    name = models.CharField(max_length=255)
    graduate_year = models.CharField(max_length=4)
    program_name = models.CharField(max_length=255)
    current_job = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    quote = models.TextField()
    photo = models.ImageField(
        upload_to='testimonials/',
        validators=[validate_square_photo],
        help_text='Wajib 600 x 600 px, JPG/PNG/WebP. Foto square 1:1.',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name


class DocumentCategory(models.Model):
    """Document categories"""
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Document Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class DocumentItem(models.Model):
    """Documents/files for download"""
    FILE_TYPE_CHOICES = [
        ('PDF', 'PDF'),
        ('DOCX', 'DOCX'),
        ('XLSX', 'XLSX'),
    ]
    
    title = models.CharField(max_length=255)
    category = models.ForeignKey(DocumentCategory, on_delete=models.CASCADE, related_name='items')
    file_size = models.CharField(max_length=50, help_text="e.g., '2.5 MB'")
    file_type = models.CharField(max_length=20, choices=FILE_TYPE_CHOICES)
    download_url = models.URLField()
    updated_at = models.DateTimeField(auto_now=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-updated_at']
    
    def __str__(self):
        return self.title


class GuidelineItem(models.Model):
    """Guidelines/pedoman documents"""
    AUDIENCE_CHOICES = [
        ('Mahasiswa', 'Mahasiswa'),
        ('Dosen & Staff', 'Dosen & Staff'),
        ('Umum', 'Umum'),
    ]
    
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    target_audience = models.CharField(max_length=50, choices=AUDIENCE_CHOICES)
    file_size = models.CharField(max_length=50, help_text="e.g., '1.2 MB'")
    file_type = models.CharField(max_length=10, default='PDF', help_text="Currently PDF only")
    download_url = models.URLField()
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-updated_at']
        verbose_name_plural = "Guideline Items"
    
    def __str__(self):
        return self.title
