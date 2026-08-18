from django.contrib import admin
from .models import News, ResearchNews


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
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
class ResearchNewsAdmin(admin.ModelAdmin):
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
