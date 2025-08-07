from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)
from accounts.views import RegisterUserView, UpdateUserView
from .views import *

urlpatterns = [
    
    #### user accounts creation and auth urls ####
    path('register/', RegisterUserView.as_view()),
    path('update/', UpdateUserView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]