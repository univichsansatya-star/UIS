from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Faculty, StudyProgram, Accreditation
from .serializers import (
    FacultySerializer, FacultyListSerializer, StudyProgramSerializer, AccreditationSerializer
)


class FacultyViewSet(viewsets.ReadOnlyModelViewSet):
    """Faculty viewset"""
    queryset = Faculty.objects.all()
    serializer_class = FacultyListSerializer
    lookup_field = 'slug'


class StudyProgramViewSet(viewsets.ReadOnlyModelViewSet):
    """Study Program viewset"""
    queryset = StudyProgram.objects.all()
    serializer_class = StudyProgramSerializer
    lookup_field = 'slug'


class AccreditationViewSet(viewsets.ReadOnlyModelViewSet):
    """Accreditation viewset"""
    queryset = Accreditation.objects.all()
    serializer_class = AccreditationSerializer
    lookup_field = 'slug'
