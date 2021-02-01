from rest_framework import serializers
from .models import *

class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = ('id', 'title', 'notes', 'author_id', 'genre_id', 'series_id')