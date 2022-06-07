from django.urls import path
from .views import AuthView,EventManageView,auth_check

urlpatterns = [
    path('auth/login/',AuthView.as_view(),name = 'login'),
    path('auth/logout/',AuthView.as_view(),name = 'logout'),
    path('event-get_user/',EventManageView.as_view(),name = 'get_user'),
    path('create_event/',EventManageView.as_view(),name = 'create_event'),
    path('auth_check/',auth_check,name = 'auth_check'),
]
