from django.contrib import admin
from django import forms
from unfold.admin import ModelAdmin
from .models import ContactInfo, CampusStats, RectorGreeting, HeroSlide, PopupAnnouncement


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
    list_display = ('name', 'title')
    fieldsets = (
        ('Rector Information', {
            'fields': ('name', 'title', 'photo', 'quote', 'full_message')
        }),
    )


class HeroSlideAdminForm(forms.ModelForm):
    image = forms.ImageField(
        label='Image (1920 x 720 px)',
        help_text=(
            'Recommended: 1920 x 720 px (ratio 8:3), JPG or WebP. '
            'Keep important text or logos in the center because the image uses object-cover on mobile.'
        ),
    )

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


@admin.register(PopupAnnouncement)
class PopupAnnouncementAdmin(ModelAdmin):
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
