from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'news'

router = DefaultRouter()
router.register(r'berita', views.NewsViewSet, basename='news')
router.register(r'lppm', views.ResearchNewsViewSet, basename='research-news')

urlpatterns = [
    path('', include(router.urls)),
]
