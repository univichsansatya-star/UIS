from django.contrib import admin
from django import forms
from unfold.admin import ModelAdmin
from config.image_forms import image_upload_field
from config.image_validation import validate_accreditation_image, validate_faculty_image
from .models import Faculty, StudyProgram, Accreditation


class FacultyAdminForm(forms.ModelForm):
    image = image_upload_field('Foto Fakultas', '800 x 500', '8:5', validate_faculty_image)

    class Meta:
        model = Faculty
        fields = '__all__'


class AccreditationAdminForm(forms.ModelForm):
    image = image_upload_field('Dokumen Akreditasi', '1200 x 800', '3:2', validate_accreditation_image)

    class Meta:
        model = Accreditation
        fields = '__all__'


@admin.register(Faculty)
class FacultyAdmin(ModelAdmin):
    form = FacultyAdminForm
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
    form = AccreditationAdminForm
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
