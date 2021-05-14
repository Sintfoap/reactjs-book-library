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
        fields = ('id', 'title', 'notes', 'author', 'genre', 'series','number_in_series','owned')

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
        fields = ('id', 'title', 'notes', 'author', 'genre', 'series', 'author_obj', 'genre_obj', 'series_obj','number_in_series', 'owned')

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

#********************************************************************************************************
#******************************************* MUSIC LIBRARY **********************************************
#********************************************************************************************************

class ComposerEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Composer
        fields = ('id','first_name', 'last_name')

class PublisherEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ('id','name')

class LyracistEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lyracist
        fields = ('id', 'first_name', 'last_name')

class SongEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ('id', 'title', 'composers', 'publisher', 'arranger', 'lyracists')

class SongGetSerializer(serializers.ModelSerializer):
    composers_list = serializers.SerializerMethodField('get_composers')
    publisher_obj = serializers.SerializerMethodField('get_publisher')
    arranger_obj = serializers.SerializerMethodField('get_arranger')
    lyracists_list = serializers.SerializerMethodField('get_lyracists')

    def get_composers(self, song):
        return ComposerEditSerializer(song.composers, many=True).data
    def get_publisher(self, song):
        return PublisherEditSerializer(song.publisher, many=False).data
    def get_arranger(self, song):
        return ArrangerEditSerializer(song.arranger, many=False).data  
    def get_lyracists(self, song):
        return LyracistEditSerializer(song.lyracists, many=True).data
    class Meta:
        model = Song
        fields = ('id', 'title', 'composers', 'publisher', 'arranger', 'lyracists', 'composers_list', 'publisher_obj', 'arranger_obj', 'lyracists_list')

class ComposerGetSerializer(serializers.ModelSerializer):
    songs = SongEditSerializer(many=True)

    class Meta:
        model = Composer
        fields = ('id','first_name', 'last_name', 'songs')

class PublisherGetSerializer(serializers.ModelSerializer):
    songs = SongEditSerializer(many=True)

    class Meta:
        model = Publisher
        fields = ('id', 'name', 'songs')

class LyracistGetSerializer(serializers.ModelSerializer):
    songs = SongEditSerializer(many=True, read_only=True)

    class Meta:
        model = Lyracist
        fields = ('id', 'first_name', 'last_name', 'songs')