from django.contrib import admin
from django import forms
from unfold.admin import ModelAdmin
from config.image_forms import image_upload_field
from config.image_validation import validate_news_image
from .models import News, ResearchNews


class NewsAdminForm(forms.ModelForm):
    cover_image = image_upload_field('Cover Berita', '1200 x 675', '16:9', validate_news_image)

    class Meta:
        model = News
        fields = '__all__'


class ResearchNewsAdminForm(forms.ModelForm):
    cover_image = image_upload_field('Cover Research/LPPM', '1200 x 675', '16:9', validate_news_image)

    class Meta:
        model = ResearchNews
        fields = '__all__'


@admin.register(News)
class NewsAdmin(ModelAdmin):
    form = NewsAdminForm
    list_display = ('title', 'category', 'author', 'published_at', 'views_count')
    list_filter = ('category', 'published_at')
    search_fields = ('title', 'author', 'summary')
    readonly_fields = ('slug', 'views_count', 'created_at', 'updated_at')
    fieldsets = (
        ('News Information', {
            'fields': ('title', 'slug', 'category', 'author', 'published_at')
        }),
        ('Content', {
            'fields': ('summary', 'content', 'cover_image')
        }),
        ('Media', {
            'fields': ('video_url',),
            'classes': ('collapse',)
        }),
        ('Statistics', {
            'fields': ('views_count',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ResearchNews)
class ResearchNewsAdmin(ModelAdmin):
    form = ResearchNewsAdminForm
    list_display = ('title', 'category', 'author', 'published_at')
    list_filter = ('category', 'published_at')
    search_fields = ('title', 'author', 'abstract')
    readonly_fields = ('slug', 'created_at', 'updated_at')
    fieldsets = (
        ('Research Information', {
            'fields': ('title', 'slug', 'category', 'author', 'published_at')
        }),
        ('Content', {
            'fields': ('abstract', 'content', 'cover_image')
        }),
        ('Download', {
            'fields': ('download_pdf_url',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
