from django.urls import path
from . import views

app_name = 'admissions'

urlpatterns = [
    path('pmb/register/', views.admission_register, name='pmb-register'),
    path('layanan-akademik/submit/', views.academic_registration_submit, name='academic-registration'),
    path('tracer-study/submit/', views.tracer_study_submit, name='tracer-study'),
]
