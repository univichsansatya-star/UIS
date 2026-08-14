from rest_framework import serializers
from .models import Faculty, StudyProgram, Accreditation


class StudyProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyProgram
        fields = [
            'id', 'name', 'slug', 'degree', 'accreditation', 'content',
            'faculty_id', 'duration_years', 'career_outlooks', 'head_of_program',
            'icon_name'
        ]


class FacultySerializer(serializers.ModelSerializer):
    programs = StudyProgramSerializer(many=True, read_only=True)
    
    class Meta:
        model = Faculty
        fields = ['id', 'name', 'slug', 'description', 'dean_name', 'image', 'programs']


class FacultyListSerializer(serializers.ModelSerializer):
    """Simplified faculty serializer for list views"""
    class Meta:
        model = Faculty
        fields = ['id', 'name', 'slug', 'description', 'dean_name', 'image']


class AccreditationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accreditation
        fields = [
            'id', 'title', 'slug', 'category', 'accreditation_grade',
            'decree_number', 'valid_until', 'content', 'image'
        ]
