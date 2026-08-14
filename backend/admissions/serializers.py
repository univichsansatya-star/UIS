from rest_framework import serializers
from .models import AdmissionApplication, AcademicRegistrationForm, TracerStudySubmission


class AdmissionApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdmissionApplication
        fields = [
            'full_name', 'nik', 'birth_place', 'birth_date', 'gender', 'religion',
            'address', 'phone_number', 'email', 'previous_school', 'graduation_year',
            'previous_major', 'chosen_program_id', 'father_name', 'mother_name',
            'guardian_name', 'parent_occupation', 'parent_income', 'registration_number'
        ]
        read_only_fields = ['registration_number']


class AcademicRegistrationFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicRegistrationForm
        fields = [
            'type', 'nim', 'full_name', 'study_program_id', 'email', 'phone',
            'thesis_title', 'advisor_name', 'academic_year', 'notes', 'ticket_no'
        ]
        read_only_fields = ['ticket_no']


class TracerStudySubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TracerStudySubmission
        fields = [
            'nim', 'full_name', 'study_program_id', 'graduation_year',
            'employment_status', 'company_name', 'job_title', 'first_job_time_months',
            'monthly_salary_range', 'relevance_to_major', 'feedback_for_campus'
        ]
