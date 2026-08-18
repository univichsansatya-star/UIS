from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import get_object_or_404
from .models import News, ResearchNews
from .serializers import NewsSerializer, ResearchNewsSerializer


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """News viewset with filtering by category and search"""
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = News.objects.all()
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category and category != 'Semua':
            queryset = queryset.filter(category=category)
        
        # Search in title and summary
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(summary__icontains=search)
            )
        
        return queryset.order_by('-published_at')
    
    def retrieve(self, request, *args, **kwargs):
        """Increment views_count when retrieving a news article"""
        instance = self.get_object()
        instance.views_count += 1
        instance.save(update_fields=['views_count'])
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ResearchNewsViewSet(viewsets.ReadOnlyModelViewSet):
    """Research News (LPPM) viewset"""
    queryset = ResearchNews.objects.all()
    serializer_class = ResearchNewsSerializer
    lookup_field = 'slug'
