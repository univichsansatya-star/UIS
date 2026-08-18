from django.urls import path
from . import views

app_name = 'content'

urlpatterns = [
    path('contact-info/', views.contact_info, name='contact-info'),
    path('campus-stats/', views.campus_stats, name='campus-stats'),
    path('rector-greeting/', views.rector_greeting, name='rector-greeting'),
    path('hero-slides/', views.HeroSlideViewSet.as_view({'get': 'list'}), name='hero-slides'),
    path('popup-announcement/', views.popup_announcement, name='popup-announcement'),
]
