from rest_framework import serializers
from .models import (
    ContactInfo, CampusStats, RectorGreeting, HeroSlide, PopupAnnouncement,
    CampusProfile, VisionMission, VideoTour, RunningQuote,
)


class ContactInfoSerializer(serializers.ModelSerializer):
    social_media = serializers.SerializerMethodField()
    
    class Meta:
        model = ContactInfo
        fields = [
            'address', 'phone1', 'phone2', 'whatsapp', 'email', 
            'pmb_email', 'operational_hours', 'google_maps_embed_url', 
            'social_media'
        ]
    
    def get_social_media(self, obj):
        return {
            'instagram': obj.instagram,
            'facebook': obj.facebook,
            'youtube': obj.youtube,
            'tiktok': obj.tiktok,
        }


class CampusStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampusStats
        fields = [
            'students_count', 'alumni_count', 'study_programs_count',
            'employed_rate_percentage', 'accreditation_grade'
        ]


class RectorGreetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RectorGreeting
        fields = ['name', 'title', 'photo', 'quote', 'full_message']


class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = ['id', 'title', 'subtitle', 'image', 'cta_text', 'cta_link', 'badge']


class PopupAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopupAnnouncement
        fields = ['id', 'title', 'image', 'description', 'cta_text', 'cta_link', 'is_active']


class CampusProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampusProfile
        fields = ['id', 'title', 'slug', 'content', 'order']


class VisionMissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisionMission
        fields = ['vision', 'missions']


class VideoTourSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoTour
        fields = ['title', 'youtube_embed_url', 'description']


class RunningQuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = RunningQuote
        fields = ['id', 'text', 'author', 'order']
