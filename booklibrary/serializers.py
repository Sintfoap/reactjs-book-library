from rest_framework import serializers
from .models import *


class AuthorEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'first_name', 'last_name')


class GenreEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'category')


class SeriesEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = ('id', 'name')


class BookEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'notes', 'author', 'genre',
                  'series', 'number_in_series', 'owned')


class BookGetSerializer(serializers.ModelSerializer):
    author = AuthorEditSerializer(many=False)
    genre = GenreEditSerializer(many=False)
    series = SeriesEditSerializer(many=False)

    class Meta:
        model = Book
        fields = ('id', 'title', 'notes', 'author', 'genre', 'series',
                  'number_in_series', 'owned')
        read_only = fields


class AuthorGetSerializer(serializers.ModelSerializer):
    books = BookGetSerializer(many=True)

    class Meta:
        model = Author
        fields = ('id', 'first_name', 'last_name', 'books')


class GenreGetSerializer(serializers.ModelSerializer):
    books = BookGetSerializer(many=True)

    class Meta:
        model = Genre
        fields = ('id', 'category', 'books')


class SeriesGetSerializer(serializers.ModelSerializer):
    books = BookGetSerializer(many=True)

    class Meta:
        model = Series
        fields = ('id', 'name', 'books')

# ********************************************************************************************************
# ******************************************* MUSIC LIBRARY **********************************************
# ********************************************************************************************************


class PeopleEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = ('id', 'first_name', 'last_name')


class PublisherEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ('id', 'name')
        
class CollectionEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ('id', 'name')

class SongEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ('id', 'title', 'notes', 'publisher', 'collection')


class TagEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'tag')


class DateEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateSung
        fields = ('id', 'date', 'description', 'song')


class SongGetSerializer(serializers.ModelSerializer):
    composers_list = serializers.SerializerMethodField('get_composers')
    publisher_obj = serializers.SerializerMethodField('get_publisher')
    collection_obj = serializers.SerializerMethodField('get_collection')
    arrangers_list = serializers.SerializerMethodField('get_arrangers')
    lyricists_list = serializers.SerializerMethodField('get_lyricists')
    date = serializers.SerializerMethodField('get_date')

    def get_composers(self, song):
        return PeopleEditSerializer(song.composers, many=True).data

    def get_publisher(self, song):
        return PublisherEditSerializer(song.publisher, many=False).data
    
    def get_collection(self, song):
        return CollectionEditSerializer(song.collection, many=False).data

    def get_arrangers(self, song):
        return PeopleEditSerializer(song.arrangers, many=True).data

    def get_lyricists(self, song):
        return PeopleEditSerializer(song.lyricists, many=True).data

    def get_date(self, song):
        return DateEditSerializer(many=False).data

    class Meta:
        model = Song
        fields = ('id', 'title', 'notes', 'publisher', 'composers', 'arrangers', 'tags', 'lyricists',
                  'publisher_obj', 'collection_obj', 'composers_list', 'arrangers_list', 'lyricists_list', 'date')


class PeopleGetSerializer(serializers.ModelSerializer):
    songs_composed = serializers.SerializerMethodField('get_composed')
    songs_arranged = serializers.SerializerMethodField('get_arranged')
    songs_lirisized = serializers.SerializerMethodField('get_lirisized')

    def get_composed(self, person):
        return SongEditSerializer(person.songs_composed, many=True).data

    def get_arranged(self, person):
        return SongEditSerializer(person.songs_arranged, many=True).data

    def get_lirisized(self, person):
        return SongEditSerializer(person.songs_lirisized, many=True).data
    
    class Meta:
        model = People
        fields = ('id', 'first_name', 'last_name', 'songs_composed',
                  'songs_arranged', 'songs_lirisized')


class PublisherGetSerializer(serializers.ModelSerializer):
    songs = SongEditSerializer(many=True)

    class Meta:
        model = Publisher
        fields = ('id', 'name', 'songs')
        
class CollectionGetSerializer(serializers.ModelSerializer):
    songs = SongEditSerializer(many=True)

    class Meta:
        model = Collection
        fields = ('id', 'name', 'songs')


class TagGetSerializer(serializers.ModelSerializer):
    # songs = serializers.SerializerMethodField('get_songs')

    def get_songs(self, tag):
        return SongEditSerializer(tag.songs, many=True).data

    class Meta:
        model = Tag
        fields = ('id', 'tag')


class DateGetSerializer(serializers.ModelSerializer):
    song_obj = serializers.SerializerMethodField('get_song')

    def get_song(self, date):
        return SongEditSerializer(date.song, many=False).data

    class Meta:
        model = DateSung
        fields = ('id', 'date', 'description', 'song_obj')
