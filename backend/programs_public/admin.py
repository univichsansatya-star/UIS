from django.contrib import admin
from django import forms
from unfold.admin import ModelAdmin
from config.image_forms import image_upload_field
from config.image_validation import validate_card_image, validate_square_photo, validate_training_image
from .models import Training, Speaker, JobVacancy, Scholarship, Testimonial, DocumentCategory, DocumentItem, GuidelineItem


class TrainingAdminForm(forms.ModelForm):
    image = image_upload_field('Foto Pelatihan', '1200 x 675', '16:9', validate_training_image)

    class Meta:
        model = Training
        fields = '__all__'


class SpeakerAdminForm(forms.ModelForm):
    photo = image_upload_field('Foto Pembicara', '600 x 600', '1:1', validate_square_photo)

    class Meta:
        model = Speaker
        fields = '__all__'


class JobVacancyAdminForm(forms.ModelForm):
    image = image_upload_field('Foto Lowongan', '1200 x 800', '3:2', validate_card_image)

    class Meta:
        model = JobVacancy
        fields = '__all__'


class ScholarshipAdminForm(forms.ModelForm):
    image = image_upload_field('Foto Beasiswa', '1200 x 800', '3:2', validate_card_image)

    class Meta:
        model = Scholarship
        fields = '__all__'


class TestimonialAdminForm(forms.ModelForm):
    photo = image_upload_field('Foto Testimonial', '600 x 600', '1:1', validate_square_photo)

    class Meta:
        model = Testimonial
        fields = '__all__'


class SpeakerInline(admin.TabularInline):
    model = Speaker
    form = SpeakerAdminForm
    extra = 0
    fields = ('name', 'role', 'institution', 'photo')


@admin.register(Training)
class TrainingAdmin(ModelAdmin):
    form = TrainingAdminForm
    list_display = ('title', 'date', 'status', 'location')
    list_filter = ('status', 'date')
    search_fields = ('title', 'location')
    readonly_fields = ('slug', 'created_at', 'updated_at')
    inlines = [SpeakerInline]
    fieldsets = (
        ('Training Information', {
            'fields': ('title', 'slug', 'subtitle', 'date', 'status')
        }),
        ('Timing', {
            'fields': ('start_time', 'end_time')
        }),
        ('Details', {
            'fields': ('location', 'description', 'fee', 'quota_left')
        }),
        ('Registration', {
            'fields': ('registration_link', 'image')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(JobVacancy)
class JobVacancyAdmin(ModelAdmin):
    form = JobVacancyAdminForm
    list_display = ('title', 'company_name', 'field', 'close_date', 'is_published')
    list_filter = ('field', 'is_published', 'close_date')
    search_fields = ('title', 'company_name', 'location')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Job Information', {
            'fields': ('title', 'company_name', 'location', 'field', 'contact_email')
        }),
        ('Details', {
            'fields': ('description', 'requirements', 'image')
        }),
        ('Dates', {
            'fields': ('open_date', 'close_date')
        }),
        ('Status', {
            'fields': ('is_published',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Scholarship)
class ScholarshipAdmin(ModelAdmin):
    form = ScholarshipAdminForm
    list_display = ('title', 'provider', 'deadline', 'is_published')
    list_filter = ('provider', 'is_published', 'deadline')
    search_fields = ('title', 'provider')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Scholarship Information', {
            'fields': ('title', 'provider', 'image', 'summary')
        }),
        ('Details', {
            'fields': ('eligibility', 'benefits', 'deadline')
        }),
        ('Status', {
            'fields': ('is_published',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Testimonial)
class TestimonialAdmin(ModelAdmin):
    form = TestimonialAdminForm
    list_display = ('name', 'program_name', 'current_job', 'graduate_year')
    list_filter = ('graduate_year', 'program_name')
    search_fields = ('name', 'program_name', 'company')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Testimonial Information', {
            'fields': ('name', 'graduate_year', 'program_name', 'photo')
        }),
        ('Career', {
            'fields': ('current_job', 'company')
        }),
        ('Quote', {
            'fields': ('quote',)
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


@admin.register(DocumentCategory)
class DocumentCategoryAdmin(ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


class DocumentItemInline(admin.TabularInline):
    model = DocumentItem
    extra = 0
    fields = ('title', 'file_type', 'file_size', 'download_url', 'updated_at')
    readonly_fields = ('updated_at',)


@admin.register(DocumentItem)
class DocumentItemAdmin(ModelAdmin):
    list_display = ('title', 'category', 'file_type', 'updated_at')
    list_filter = ('category', 'file_type', 'updated_at')
    search_fields = ('title', 'description')
    readonly_fields = ('updated_at', 'created_at')
    fieldsets = (
        ('Document Information', {
            'fields': ('title', 'category', 'description')
        }),
        ('File Details', {
            'fields': ('file_type', 'file_size', 'download_url')
        }),
        ('Metadata', {
            'fields': ('updated_at', 'created_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(GuidelineItem)
class GuidelineItemAdmin(ModelAdmin):
    list_display = ('title', 'category', 'target_audience', 'updated_at')
    list_filter = ('category', 'target_audience', 'updated_at')
    search_fields = ('title', 'category')
    readonly_fields = ('updated_at', 'created_at')
    fieldsets = (
        ('Guideline Information', {
            'fields': ('title', 'category', 'target_audience')
        }),
        ('File Details', {
            'fields': ('file_type', 'file_size', 'download_url')
        }),
        ('Metadata', {
            'fields': ('updated_at', 'created_at'),
            'classes': ('collapse',)
        }),
    )
