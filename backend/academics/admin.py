from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Faculty, StudyProgram, Accreditation


@admin.register(Faculty)
class FacultyAdmin(ModelAdmin):
    list_display = ('name', 'dean_name', 'created_at')
    search_fields = ('name', 'dean_name')
    readonly_fields = ('slug', 'created_at', 'updated_at')
    fieldsets = (
        ('Faculty Information', {
            'fields': ('name', 'slug', 'description', 'dean_name', 'image')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


class StudyProgramInline(admin.TabularInline):
    model = StudyProgram
    extra = 0
    fields = ('name', 'degree', 'accreditation', 'head_of_program')
    readonly_fields = ('slug',)


@admin.register(StudyProgram)
class StudyProgramAdmin(ModelAdmin):
    list_display = ('name', 'degree', 'accreditation', 'faculty', 'duration_years')
    list_filter = ('degree', 'accreditation', 'faculty')
    search_fields = ('name', 'head_of_program')
    readonly_fields = ('slug', 'created_at', 'updated_at')
    fieldsets = (
        ('Program Information', {
            'fields': ('name', 'slug', 'degree', 'accreditation', 'faculty')
        }),
        ('Details', {
            'fields': ('content', 'head_of_program', 'duration_years', 'career_outlooks', 'icon_name')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Accreditation)
class AccreditationAdmin(ModelAdmin):
    list_display = ('title', 'category', 'accreditation_grade', 'valid_until')
    list_filter = ('category', 'accreditation_grade', 'valid_until')
    search_fields = ('title', 'decree_number')
    readonly_fields = ('slug', 'created_at', 'updated_at')
    fieldsets = (
        ('Accreditation Information', {
            'fields': ('title', 'slug', 'category', 'accreditation_grade')
        }),
        ('Details', {
            'fields': ('decree_number', 'valid_until', 'content', 'image')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
