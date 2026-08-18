from rest_framework import serializers
from .models import News, ResearchNews


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = [
            'id', 'slug', 'title', 'category', 'cover_image', 'published_at',
            'author', 'summary', 'content', 'video_url', 'views_count'
        ]


class ResearchNewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchNews
        fields = [
            'id', 'slug', 'title', 'category', 'author', 'published_at',
            'cover_image', 'abstract', 'content', 'download_pdf_url'
        ]
