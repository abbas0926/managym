from django.urls import path, include
from rest_framework import routers
from .views import RegisterView, ChangePasswordView, UpdateProfileView, LogoutView, LogoutAllView, UserAPIView, UserDetailAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView





urlpatterns = [
    path('users/', UserAPIView.as_view(),  name="user"),
    path('users/<int:pk>/', UserDetailAPIView.as_view(), name="user-detail"),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('rest-auth/', include('rest_auth.urls')), 
    path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password'),
    path('update_profile/<int:pk>/', UpdateProfileView.as_view(), name='auth_update_profile'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('logout_all/', LogoutAllView.as_view(), name='auth_logout_all'),
]