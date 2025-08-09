from django.contrib import admin
from .models import *

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    model = BlogPost
    list_display = ['id', 'title', 'author', 'status']
    search_fields = ['title', 'author']
    list_filter = ['status']


admin.site.register(Comment)
admin.site.register(Tag)
