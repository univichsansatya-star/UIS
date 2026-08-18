from django.contrib import admin
from solo.admin import SingletonModelAdmin
from .models import ContactInfo, CampusStats, RectorGreeting, HeroSlide, PopupAnnouncement


@admin.register(ContactInfo)
class ContactInfoAdmin(SingletonModelAdmin):
    fieldsets = (
        ('Contact Information', {
            'fields': ('address', 'phone1', 'phone2', 'whatsapp', 'email', 'pmb_email', 'operational_hours', 'google_maps_embed_url')
        }),
        ('Social Media', {
            'fields': ('instagram', 'facebook', 'youtube', 'tiktok')
        }),
    )


@admin.register(CampusStats)
class CampusStatsAdmin(SingletonModelAdmin):
    pass


@admin.register(RectorGreeting)
class RectorGreetingAdmin(SingletonModelAdmin):
    list_display = ('name', 'title')
    fieldsets = (
        ('Rector Information', {
            'fields': ('name', 'title', 'photo', 'quote', 'full_message')
        }),
    )


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)
    ordering = ['order']
    fieldsets = (
        ('Slide Content', {
            'fields': ('title', 'subtitle', 'image', 'badge', 'order')
        }),
        ('Call to Action', {
            'fields': ('cta_text', 'cta_link')
        }),
    )


@admin.register(PopupAnnouncement)
class PopupAnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Announcement Content', {
            'fields': ('title', 'image', 'description', 'is_active')
        }),
        ('Call to Action', {
            'fields': ('cta_text', 'cta_link')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
