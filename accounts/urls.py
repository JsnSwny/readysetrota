from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
from .views import ChangePasswordView, Verify, SendInvite
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/verify', Verify.as_view()),
    path('api/auth/send-invite', SendInvite.as_view()),
    path('api/auth/changepassword', ChangePasswordView.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),

    path('reset_password', auth_views.PasswordResetView.as_view(), name="reset_password"),
    path('reset_password_sent', auth_views.PasswordResetDoneView.as_view(), name="password_reset_done"),
    path('reset/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path('reset_password_complete', auth_views.PasswordResetCompleteView.as_view(), name="password_reset_complete")
]