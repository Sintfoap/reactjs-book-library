from rest_framework import serializers
from .models import *

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'notes', 'author', 'genre', 'series')

class AuthorGetSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True)

    class Meta:
        model = Author
        fields = ('id','first_name', 'last_name', 'books')

class AuthorEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id','first_name', 'last_name')

class GenreGetSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True)

    class Meta:
        model = Genre
        fields = ('id','category', 'books')

class GenreEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id','category')

class SeriesGetSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True)

    class Meta:
        model = Series
        fields = ('id','name', 'books')

class SeriesEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = ('id','name')    