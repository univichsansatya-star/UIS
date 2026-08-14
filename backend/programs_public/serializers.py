from rest_framework import serializers
from .models import (
    Training, Speaker, JobVacancy, Scholarship, Testimonial, 
    DocumentCategory, DocumentItem, GuidelineItem
)


class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = ['id', 'name', 'role', 'photo', 'institution']


class TrainingSerializer(serializers.ModelSerializer):
    speakers = SpeakerSerializer(many=True, read_only=True)
    
    class Meta:
        model = Training
        fields = [
            'id', 'slug', 'title', 'subtitle', 'image', 'date',
            'start_time', 'end_time', 'location', 'description',
            'registration_link', 'status', 'speakers', 'fee', 'quota_left'
        ]


class JobVacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobVacancy
        fields = [
            'id', 'title', 'company_name', 'location', 'field',
            'description', 'requirements', 'open_date', 'close_date',
            'image', 'is_published', 'contact_email'
        ]


class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = [
            'id', 'title', 'provider', 'image', 'summary',
            'eligibility', 'benefits', 'deadline', 'is_published'
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'name', 'graduate_year', 'program_name',
            'current_job', 'company', 'quote', 'photo'
        ]


class DocumentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentCategory
        fields = ['id', 'name']


class DocumentItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentItem
        fields = [
            'id', 'title', 'category_id', 'file_size', 'file_type',
            'download_url', 'updated_at', 'description'
        ]


class DocumentCategoryDetailSerializer(serializers.ModelSerializer):
    items = DocumentItemSerializer(many=True, read_only=True, source='items')
    
    class Meta:
        model = DocumentCategory
        fields = ['id', 'name', 'items']


class GuidelineItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuidelineItem
        fields = [
            'id', 'title', 'category', 'target_audience',
            'file_size', 'file_type', 'download_url', 'updated_at'
        ]
