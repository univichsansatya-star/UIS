from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'programs_public'

router = DefaultRouter()
router.register(r'pelatihan', views.TrainingViewSet, basename='training')
router.register(r'loker', views.JobVacancyViewSet, basename='job-vacancy')
router.register(r'beasiswa', views.ScholarshipViewSet, basename='scholarship')
router.register(r'testimoni', views.TestimonialViewSet, basename='testimonial')
router.register(r'pedoman', views.GuidelineItemViewSet, basename='guideline')

urlpatterns = [
    path('', include(router.urls)),
    path('download/categories/', views.document_categories, name='document-categories'),
    path('download/files/', views.document_files, name='document-files'),
]
