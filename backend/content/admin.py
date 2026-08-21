from django.contrib import admin
from django import forms
from unfold.admin import ModelAdmin
from config.image_forms import image_upload_field
from config.image_validation import validate_popup_image
from config.image_validation import validate_hero_image, validate_rector_photo
from .models import (
    ContactInfo, CampusStats, RectorGreeting, HeroSlide, PopupAnnouncement,
    CampusProfile, VisionMission, VideoTour, RunningQuote,
)


class UnfoldSingletonModelAdmin(ModelAdmin):
    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(ContactInfo)
class ContactInfoAdmin(UnfoldSingletonModelAdmin):
    fieldsets = (
        ('Contact Information', {
            'fields': ('address', 'phone1', 'phone2', 'whatsapp', 'email', 'pmb_email', 'operational_hours', 'google_maps_embed_url')
        }),
        ('Social Media', {
            'fields': ('instagram', 'facebook', 'youtube', 'tiktok')
        }),
    )


@admin.register(CampusStats)
class CampusStatsAdmin(UnfoldSingletonModelAdmin):
    pass


@admin.register(RectorGreeting)
class RectorGreetingAdmin(UnfoldSingletonModelAdmin):
    class RectorGreetingAdminForm(forms.ModelForm):
        photo = image_upload_field('Foto Rektor', '600 x 800', '3:4', validate_rector_photo)

        class Meta:
            model = RectorGreeting
            fields = '__all__'

    form = RectorGreetingAdminForm
    list_display = ('name', 'title')
    fieldsets = (
        ('Rector Information', {
            'fields': ('name', 'title', 'photo', 'quote', 'full_message')
        }),
    )


class HeroSlideAdminForm(forms.ModelForm):
    image = image_upload_field('Hero Slide', '1920 x 720', '8:3', validate_hero_image)

    class Meta:
        model = HeroSlide
        fields = '__all__'


@admin.register(HeroSlide)
class HeroSlideAdmin(ModelAdmin):
    form = HeroSlideAdminForm
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


@admin.register(CampusProfile)
class CampusProfileAdmin(ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)
    ordering = ['order']
    fieldsets = (
        ('Profile Content', {
            'fields': ('title', 'slug', 'content', 'order')
        }),
    )


@admin.register(VisionMission)
class VisionMissionAdmin(UnfoldSingletonModelAdmin):
    pass


@admin.register(VideoTour)
class VideoTourAdmin(UnfoldSingletonModelAdmin):
    pass


@admin.register(RunningQuote)
class RunningQuoteAdmin(ModelAdmin):
    list_display = ('text', 'order')
    list_editable = ('order',)
    ordering = ['order']
    fieldsets = (
        ('Running Quote', {
            'fields': ('text', 'author', 'order')
        }),
    )


@admin.register(PopupAnnouncement)
class PopupAnnouncementAdmin(ModelAdmin):
    class PopupAnnouncementAdminForm(forms.ModelForm):
        image = image_upload_field('Popup Announcement', '1200 x 800', '3:2', validate_popup_image)

        class Meta:
            model = PopupAnnouncement
            fields = '__all__'

    form = PopupAnnouncementAdminForm
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
