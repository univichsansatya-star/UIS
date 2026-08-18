from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    Training, JobVacancy, Scholarship, Testimonial,
    DocumentCategory, DocumentItem, GuidelineItem
)
from .serializers import (
    TrainingSerializer, JobVacancySerializer, ScholarshipSerializer,
    TestimonialSerializer, DocumentCategorySerializer, DocumentItemSerializer,
    DocumentCategoryDetailSerializer, GuidelineItemSerializer
)


class TrainingViewSet(viewsets.ReadOnlyModelViewSet):
    """Training programs viewset"""
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer
    lookup_field = 'slug'


class JobVacancyViewSet(viewsets.ReadOnlyModelViewSet):
    """Job vacancies viewset - only published"""
    serializer_class = JobVacancySerializer
    
    def get_queryset(self):
        queryset = JobVacancy.objects.filter(is_published=True)
        
        # Filter by field
        field = self.request.query_params.get('field')
        if field:
            queryset = queryset.filter(field=field)
        
        return queryset


class ScholarshipViewSet(viewsets.ReadOnlyModelViewSet):
    """Scholarships viewset - only published"""
    queryset = Scholarship.objects.filter(is_published=True)
    serializer_class = ScholarshipSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """Testimonials viewset"""
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


@api_view(['GET'])
def document_categories(request):
    """Get all document categories"""
    categories = DocumentCategory.objects.all()
    serializer = DocumentCategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def document_files(request):
    """Get documents by category"""
    category_id = request.query_params.get('category')
    
    if not category_id:
        files = DocumentItem.objects.all()
    else:
        files = DocumentItem.objects.filter(category_id=category_id)
    
    serializer = DocumentItemSerializer(files, many=True)
    return Response(serializer.data)


class GuidelineItemViewSet(viewsets.ReadOnlyModelViewSet):
    """Guidelines viewset"""
    queryset = GuidelineItem.objects.all()
    serializer_class = GuidelineItemSerializer
