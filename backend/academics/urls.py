from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'academics'

router = DefaultRouter()
router.register(r'fakultas', views.FacultyViewSet, basename='faculty')
router.register(r'prodi', views.StudyProgramViewSet, basename='study-program')
router.register(r'akreditasi', views.AccreditationViewSet, basename='accreditation')

urlpatterns = [
    path('', include(router.urls)),
]
