from django.db import models
from solo.models import SingletonModel
from config.image_validation import validate_hero_image, validate_popup_image, validate_rector_photo


class ContactInfo(SingletonModel):
    """Singleton model for website contact information"""
    address = models.TextField()
    phone1 = models.CharField(max_length=20)
    phone2 = models.CharField(max_length=20)
    whatsapp = models.CharField(max_length=20)
    email = models.EmailField()
    pmb_email = models.EmailField()
    operational_hours = models.TextField()
    google_maps_embed_url = models.URLField()
    
    # Social Media - stored as individual fields
    instagram = models.CharField(max_length=255, default='')
    facebook = models.CharField(max_length=255, default='')
    youtube = models.CharField(max_length=255, default='')
    tiktok = models.CharField(max_length=255, default='')
    
    class Meta:
        verbose_name_plural = "Contact Info"
    
    def __str__(self):
        return "Contact Information"


class CampusStats(SingletonModel):
    """Singleton model for campus statistics"""
    students_count = models.IntegerField()
    alumni_count = models.IntegerField()
    study_programs_count = models.IntegerField()
    employed_rate_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    accreditation_grade = models.CharField(max_length=50)
    
    class Meta:
        verbose_name_plural = "Campus Stats"
    
    def __str__(self):
        return "Campus Statistics"


class RectorGreeting(SingletonModel):
    """Singleton model for rector's greeting"""
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    photo = models.ImageField(
        upload_to='rector/',
        validators=[validate_rector_photo],
        help_text='Wajib 600 x 800 px, JPG/PNG/WebP. Foto portrait 3:4.',
    )
    quote = models.TextField()
    full_message = models.JSONField(default=list, help_text="List of paragraphs")
    
    class Meta:
        verbose_name_plural = "Rector Greeting"
    
    def __str__(self):
        return f"Greeting from {self.name}"


class HeroSlide(models.Model):
    """Hero slider carousel items"""
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    image = models.ImageField(
        upload_to='hero/',
        validators=[validate_hero_image],
        help_text='Wajib 1920 x 720 px, JPG/PNG/WebP. Rasio 8:3.',
    )
    cta_text = models.CharField(max_length=100)
    cta_link = models.CharField(max_length=500)
    badge = models.CharField(max_length=100, blank=True, null=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.title


class PopupAnnouncement(models.Model):
    """Popup announcements for the website"""
    title = models.CharField(max_length=255)
    image = models.ImageField(
        upload_to='popup/',
        validators=[validate_popup_image],
        help_text='Wajib 1200 x 800 px, JPG/PNG/WebP. Rasio 3:2.',
    )
    description = models.TextField()
    cta_text = models.CharField(max_length=100)
    cta_link = models.CharField(max_length=500)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
