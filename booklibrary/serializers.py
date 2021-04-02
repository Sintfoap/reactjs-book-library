from rest_framework import serializers
from .models import *
class AuthorEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id','first_name', 'last_name')
class GenreEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id','category')
class SeriesEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = ('id','name')   
class BookEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'notes', 'author', 'genre', 'series')

class BookGetSerializer(serializers.ModelSerializer):
    author_obj = serializers.SerializerMethodField('get_author')
    genre_obj = serializers.SerializerMethodField('get_genre')
    series_obj = serializers.SerializerMethodField('get_series')


    def get_author(self, book):
        return AuthorEditSerializer(book.author, many=False).data
    def get_genre(self, book):
        return GenreEditSerializer(book.genre, many=False).data
    def get_series(self, book):
        if book.series:
            return SeriesEditSerializer(book.series, many=False).data
        else:
            return {}
    class Meta:
        model = Book
        fields = ('id', 'title', 'notes', 'author', 'genre', 'series', 'author_obj', 'genre_obj', 'series_obj')

class AuthorGetSerializer(serializers.ModelSerializer):
    books = BookGetSerializer(many=True)

    class Meta:
        model = Author
        fields = ('id','first_name', 'last_name', 'books')


class GenreGetSerializer(serializers.ModelSerializer):
    books = BookGetSerializer(many=True)

    class Meta:
        model = Genre
        fields = ('id','category', 'books')


class SeriesGetSerializer(serializers.ModelSerializer):
    books = BookGetSerializer(many=True)

    class Meta:
        model = Series
        fields = ('id','name', 'books')
 