from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import *
from .serializers import *


class ReadBlogPost(APIView):
    def get(self, request):
        posts = BlogPost.objects.filter(status='published')
        serializer = BlogPostSerializer(posts, many=True)
        
        return Response(serializer.data)


class BlogPostViewSet(ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return BlogPost.objects.filter(author=self.request.user)
        
        post_id = self.request.query_params.get("id")
        
        if post_id:
            return BlogPost.objects.filter(id=post_id)
        

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
    def get_queryset(self):
        post_id = self.request.query_params.get('post_id')
        
        if post_id:
            return Comment.objects.filter(post=post_id).order_by('-created_at')


