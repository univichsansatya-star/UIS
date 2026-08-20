from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import AdmissionApplication, AcademicRegistrationForm, TracerStudySubmission


@admin.register(AdmissionApplication)
class AdmissionApplicationAdmin(ModelAdmin):
    list_display = ('full_name', 'registration_number', 'chosen_program', 'created_at')
    list_filter = ('chosen_program', 'gender', 'created_at')
    search_fields = ('full_name', 'email', 'nik', 'registration_number')
    readonly_fields = ('registration_number', 'created_at', 'updated_at')
    fieldsets = (
        ('Identification', {
            'fields': ('registration_number', 'full_name', 'nik', 'email')
        }),
        ('Personal Information', {
            'fields': ('birth_place', 'birth_date', 'gender', 'religion', 'address', 'phone_number')
        }),
        ('Education', {
            'fields': ('previous_school', 'graduation_year', 'previous_major', 'chosen_program')
        }),
        ('Family Information', {
            'fields': ('father_name', 'mother_name', 'guardian_name', 'parent_occupation', 'parent_income')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(AcademicRegistrationForm)
class AcademicRegistrationFormAdmin(ModelAdmin):
    list_display = ('full_name', 'ticket_no', 'type', 'study_program', 'created_at')
    list_filter = ('type', 'study_program', 'created_at')
    search_fields = ('full_name', 'nim', 'email', 'ticket_no')
    readonly_fields = ('ticket_no', 'created_at', 'updated_at')
    fieldsets = (
        ('Registration Type', {
            'fields': ('type', 'ticket_no')
        }),
        ('Student Information', {
            'fields': ('nim', 'full_name', 'email', 'phone', 'study_program')
        }),
        ('Additional Information', {
            'fields': ('thesis_title', 'advisor_name', 'academic_year', 'notes'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(TracerStudySubmission)
class TracerStudySubmissionAdmin(ModelAdmin):
    list_display = ('full_name', 'nim', 'graduation_year', 'employment_status', 'created_at')
    list_filter = ('employment_status', 'relevance_to_major', 'graduation_year', 'created_at')
    search_fields = ('full_name', 'nim', 'company_name', 'job_title')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Student Information', {
            'fields': ('nim', 'full_name', 'study_program', 'graduation_year')
        }),
        ('Employment Status', {
            'fields': ('employment_status', 'company_name', 'job_title', 'first_job_time_months', 'monthly_salary_range')
        }),
        ('Assessment', {
            'fields': ('relevance_to_major', 'feedback_for_campus')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
