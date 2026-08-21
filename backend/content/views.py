from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    ContactInfo, CampusStats, RectorGreeting, HeroSlide, PopupAnnouncement,
    CampusProfile, VisionMission, VideoTour, RunningQuote,
)
from .serializers import (
    ContactInfoSerializer, CampusStatsSerializer, RectorGreetingSerializer,
    HeroSlideSerializer, PopupAnnouncementSerializer,
    CampusProfileSerializer, VisionMissionSerializer, VideoTourSerializer,
    RunningQuoteSerializer,
)


@api_view(['GET'])
def contact_info(request):
    """Get contact information"""
    try:
        obj = ContactInfo.objects.get()
    except ContactInfo.DoesNotExist:
        return Response({'error': 'Contact info not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = ContactInfoSerializer(obj)
    return Response(serializer.data)


@api_view(['GET'])
def campus_stats(request):
    """Get campus statistics"""
    try:
        obj = CampusStats.objects.get()
    except CampusStats.DoesNotExist:
        return Response({'error': 'Campus stats not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = CampusStatsSerializer(obj)
    return Response(serializer.data)


@api_view(['GET'])
def rector_greeting(request):
    """Get rector's greeting"""
    try:
        obj = RectorGreeting.objects.get()
    except RectorGreeting.DoesNotExist:
        return Response({'error': 'Rector greeting not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = RectorGreetingSerializer(obj)
    return Response(serializer.data)


class HeroSlideViewSet(viewsets.ReadOnlyModelViewSet):
    """Hero slides viewset"""
    queryset = HeroSlide.objects.all().order_by('order')
    serializer_class = HeroSlideSerializer


@api_view(['GET'])
def popup_announcement(request):
    """Get active popup announcement"""
    try:
        obj = PopupAnnouncement.objects.filter(is_active=True).latest('created_at')
    except PopupAnnouncement.DoesNotExist:
        return Response(None)
    serializer = PopupAnnouncementSerializer(obj)
    return Response(serializer.data)


class CampusProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """Campus profile sections viewset"""
    queryset = CampusProfile.objects.all().order_by('order')
    serializer_class = CampusProfileSerializer


@api_view(['GET'])
def vision_mission(request):
    """Get vision and mission"""
    try:
        obj = VisionMission.objects.get()
    except VisionMission.DoesNotExist:
        return Response({'error': 'Vision mission not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = VisionMissionSerializer(obj)
    return Response(serializer.data)


@api_view(['GET'])
def video_tour(request):
    """Get video tour"""
    try:
        obj = VideoTour.objects.get()
    except VideoTour.DoesNotExist:
        return Response({'error': 'Video tour not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = VideoTourSerializer(obj)
    return Response(serializer.data)


class RunningQuoteViewSet(viewsets.ReadOnlyModelViewSet):
    """Running quote ticker viewset"""
    queryset = RunningQuote.objects.all().order_by('order')
    serializer_class = RunningQuoteSerializer
