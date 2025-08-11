from rest_framework import serializers
from .models import BlogPost, Comment, Tag

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'content', 'created_at']
        
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class BlogPostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True) 
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'content', 'status', 'created_at', 'updated_at', 'comments', 'tags']