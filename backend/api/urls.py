from django.urls import path, include
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)
from rest_framework.routers import DefaultRouter
from accounts.views import RegisterUserView, UpdateUserView
from blogs.views import BlogPostViewSet, CommentViewSet, ReadBlogPost
from .views import *

router = DefaultRouter()
router.register('posts', BlogPostViewSet)
router.register('commets', CommentViewSet)

urlpatterns = [
    
    #### user accounts creation and auth urls ####
    path('register/', RegisterUserView.as_view()),
    path('update/', UpdateUserView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    #### blog post urls ####
    path('read/', ReadBlogPost.as_view()),
    path('read/<int:pk>/', ReadBlogPost.as_view()),
    path('', include(router.urls)),
]