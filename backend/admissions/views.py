from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AdmissionApplication, AcademicRegistrationForm, TracerStudySubmission
from .serializers import (
    AdmissionApplicationSerializer, AcademicRegistrationFormSerializer,
    TracerStudySubmissionSerializer
)


@api_view(['POST'])
def admission_register(request):
    """Register for admission (PMB)"""
    serializer = AdmissionApplicationSerializer(data=request.data)
    if serializer.is_valid():
        admission = serializer.save()
        return Response({
            'success': True,
            'registrationNumber': admission.registration_number,
            'message': 'Pendaftaran berhasil. Silakan catat nomor registrasi Anda.'
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': False,
        'errors': serializer.errors,
        'message': 'Pendaftaran gagal. Silakan periksa kembali data Anda.'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def academic_registration_submit(request):
    """Submit academic registration form"""
    serializer = AcademicRegistrationFormSerializer(data=request.data)
    if serializer.is_valid():
        form = serializer.save()
        return Response({
            'success': True,
            'ticketNo': form.ticket_no,
            'message': 'Pengajuan berhasil. Silakan catat nomor tiket Anda.'
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': False,
        'errors': serializer.errors,
        'message': 'Pengajuan gagal. Silakan periksa kembali data Anda.'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def tracer_study_submit(request):
    """Submit tracer study survey"""
    serializer = TracerStudySubmissionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'message': 'Data tracer study berhasil disimpan. Terima kasih atas partisipasi Anda.'
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': False,
        'errors': serializer.errors,
        'message': 'Penyimpanan gagal. Silakan periksa kembali data Anda.'
    }, status=status.HTTP_400_BAD_REQUEST)
