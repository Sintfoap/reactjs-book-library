from rest_framework import serializers
from .models import *

class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = ('id', 'title', 'notes', 'author_id', 'genre_id', 'series_id')

class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = ('id','first_name', 'last_name')

class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('id','category')

class SeriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Series
        fields = ('id','name')