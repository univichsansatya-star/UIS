from django.db import models
from django.utils.text import slugify


class Faculty(models.Model):
    """Faculty/Fakultas models"""
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    dean_name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='faculty/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name


class StudyProgram(models.Model):
    """Study Program / Program Studi models"""
    DEGREE_CHOICES = [
        ('D3', 'D3'),
        ('S1', 'S1'),
        ('Profesi', 'Profesi'),
        ('S2', 'S2'),
    ]
    
    ACCREDITATION_CHOICES = [
        ('Unggul', 'Unggul'),
        ('Baik Sekali', 'Baik Sekali'),
        ('Baik', 'Baik'),
        ('A', 'A'),
        ('B', 'B'),
    ]
    
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    degree = models.CharField(max_length=20, choices=DEGREE_CHOICES)
    accreditation = models.CharField(max_length=50, choices=ACCREDITATION_CHOICES)
    content = models.TextField()
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='programs')
    duration_years = models.IntegerField()
    career_outlooks = models.JSONField(default=list, help_text="List of career outlooks")
    head_of_program = models.CharField(max_length=255)
    icon_name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.name} ({self.degree})"


class Accreditation(models.Model):
    """Accreditation records"""
    CATEGORY_CHOICES = [
        ('Institusi', 'Institusi'),
        ('Program Studi', 'Program Studi'),
    ]
    
    GRADE_CHOICES = [
        ('Unggul', 'Unggul'),
        ('Baik Sekali', 'Baik Sekali'),
        ('Baik', 'Baik'),
        ('A', 'A'),
        ('B', 'B'),
    ]
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    accreditation_grade = models.CharField(max_length=50, choices=GRADE_CHOICES)
    decree_number = models.CharField(max_length=255, help_text="No SK BAN-PT / LAM-PTKes")
    valid_until = models.DateField()
    content = models.TextField()
    image = models.ImageField(upload_to='accreditation/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
