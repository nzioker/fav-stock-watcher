from django.urls import path
from .views import SignupView, LoginView, UserView,submit_entry, list_entries, logout_view, get_csrf_token

urlpatterns = [
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/user/', UserView.as_view(), name='user'),
    path('submit-entry/', submit_entry, name='submit-entry' ),
    path('entries/', list_entries, name='list-entries'),
    path('auth/logout/', logout_view),
    path('csrf/', get_csrf_token),
]
