from django.db import models
import uuid
import random
import string
from academics.models import StudyProgram


def generate_registration_number():
    """Generate unique registration number in format PMB-UIS-XXXXXX"""
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"PMB-UIS-{suffix}"


def generate_ticket_number(prefix):
    """Generate unique ticket number in format REG-UIS-{TYPE}-XXXX"""
    suffix = ''.join(random.choices(string.digits, k=4))
    return f"REG-UIS-{prefix}-{suffix}"


class AdmissionApplication(models.Model):
    """PMB (Penerimaan Mahasiswa Baru) - Admission Applications"""
    GENDER_CHOICES = [
        ('L', 'Laki-laki'),
        ('P', 'Perempuan'),
    ]
    
    # Personal Information
    full_name = models.CharField(max_length=255)
    nik = models.CharField(max_length=16, unique=True, verbose_name="NIK")
    birth_place = models.CharField(max_length=255)
    birth_date = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    religion = models.CharField(max_length=50)
    address = models.TextField()
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    
    # Education Background
    previous_school = models.CharField(max_length=255)
    graduation_year = models.CharField(max_length=4)
    previous_major = models.CharField(max_length=255)
    chosen_program = models.ForeignKey(StudyProgram, on_delete=models.PROTECT)
    
    # Family Information
    father_name = models.CharField(max_length=255)
    mother_name = models.CharField(max_length=255)
    guardian_name = models.CharField(max_length=255, blank=True, null=True)
    parent_occupation = models.CharField(max_length=255)
    parent_income = models.CharField(max_length=100, help_text="e.g., '< 1 Juta', '1-3 Juta'")
    
    # Admin
    registration_number = models.CharField(max_length=50, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        if not self.registration_number:
            self.registration_number = generate_registration_number()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.full_name} - {self.registration_number}"


class AcademicRegistrationForm(models.Model):
    """Academic Services Registration - Layanan Akademik"""
    TYPE_CHOICES = [
        ('skripsi', 'Skripsi'),
        ('sidang', 'Sidang'),
        ('wisuda', 'Wisuda'),
        ('camping', 'Camping'),
    ]
    
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    nim = models.CharField(max_length=20, verbose_name="NIM")
    full_name = models.CharField(max_length=255)
    study_program = models.ForeignKey(StudyProgram, on_delete=models.PROTECT)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
    # Optional fields
    thesis_title = models.CharField(max_length=500, blank=True, null=True)
    advisor_name = models.CharField(max_length=255, blank=True, null=True)
    academic_year = models.CharField(max_length=20, blank=True, null=True, help_text="e.g., '2023/2024'")
    notes = models.TextField(blank=True, null=True)
    
    # Admin
    ticket_no = models.CharField(max_length=50, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        if not self.ticket_no:
            self.ticket_no = generate_ticket_number(self.type.upper())
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.full_name} - {self.ticket_no} ({self.type})"


class TracerStudySubmission(models.Model):
    """Tracer Study Submissions - Alumni Career Tracking"""
    EMPLOYMENT_CHOICES = [
        ('Bekerja', 'Bekerja'),
        ('Wirausaha', 'Wirausaha'),
        ('Lanjut Studi', 'Lanjut Studi'),
        ('Mencari Kerja', 'Mencari Kerja'),
    ]
    
    RELEVANCE_CHOICES = [
        ('Sangat Sesuai', 'Sangat Sesuai'),
        ('Sesuai', 'Sesuai'),
        ('Kurang Sesuai', 'Kurang Sesuai'),
        ('Tidak Sesuai', 'Tidak Sesuai'),
    ]
    
    nim = models.CharField(max_length=20, verbose_name="NIM", unique=True)
    full_name = models.CharField(max_length=255)
    study_program = models.ForeignKey(StudyProgram, on_delete=models.PROTECT)
    graduation_year = models.CharField(max_length=4)
    
    # Employment Status
    employment_status = models.CharField(max_length=50, choices=EMPLOYMENT_CHOICES)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    job_title = models.CharField(max_length=255, blank=True, null=True)
    first_job_time_months = models.IntegerField(blank=True, null=True, help_text="Time to get first job in months")
    monthly_salary_range = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., '3-5 Juta'")
    
    # Relevance & Feedback
    relevance_to_major = models.CharField(max_length=50, choices=RELEVANCE_CHOICES)
    feedback_for_campus = models.TextField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Tracer Study Submissions"
    
    def __str__(self):
        return f"{self.full_name} ({self.graduation_year})"
