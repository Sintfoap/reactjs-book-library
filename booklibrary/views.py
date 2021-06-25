from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from .serializers import *

from django.conf import settings
import logging
logging.basicConfig(level=logging.DEBUG if settings.DEBUG else logging.INFO)
logging.debug("PRINTING DEBUG LOGS")
logging.info("PRINTING INFO LOGS")
#################################################################################################################################################################################
#  ____              _    _      _ _                         ####################################################################################################################
# |  _ \            | |  | |    (_) |                         ###################################################################################################################
# | |_) | ___   ___ | | _| |     _| |__  _ __ __ _ _ __ _   _ ###################################################################################################################
# |  _ < / _ \ / _ \| |/ / |    | | '_ \| '__/ _` | '__| | | |###################################################################################################################
# | |_) | (_) | (_) |   <| |____| | |_) | | | (_| | |  | |_| |###################################################################################################################
# |____/ \___/ \___/|_|\_\______|_|_.__/|_|  \__,_|_|   \__, |###################################################################################################################
#                                                        __/ |###################################################################################################################
#                                                       |___/ ###################################################################################################################
#################################################################################################################################################################################

#################################################################################################################################################################################
###############################     BOOKS     ###################################################################################################################################
#################################################################################################################################################################################

@api_view(['GET', 'POST'])
def books_list(request):
    if request.method == 'GET':
        data = Book.objects.all()

        serializer = BookGetSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BookEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE', 'GET'])
def book_detail(request, id):
    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BookGetSerializer(book, context={'request': request})

        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = BookEditSerializer(book, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



###############################################################################################################################################################################
###############################     AUTHORS     ###############################################################################################################################
###############################################################################################################################################################################

@api_view(['GET', 'POST'])
def authors_list(request):
    if request.method == 'GET':
        data = Author.objects.all()

        serializer = AuthorGetSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AuthorEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE', 'GET'])
def author_detail(request, id):
    try:
        author = Author.objects.get(id=id)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AuthorGetSerializer(author, context={'request': request})

        return Response(serializer.data)


    if request.method == 'PUT':
        serializer = AuthorEditSerializer(author, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if len(author.books.all()) > 0:
            return Response("Cannot delete author " + str(author) + " because it has associated books", status=status.HTTP_400_BAD_REQUEST)
        author.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

################################################################################################################################################################################
###############################     GENRES     #################################################################################################################################
################################################################################################################################################################################

@api_view(['GET', 'POST'])
def genre_list(request):
    if request.method == 'GET':
        data = Genre.objects.all()

        serializer = GenreGetSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = GenreEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE', 'GET'])
def genre_detail(request, id):
    try:
        genre = Genre.objects.get(id=id)
    except Genre.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GenreGetSerializer(genre, context={'request': request})

        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = GenreEditSerializer(genre, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if len(genre.books.all()) > 0:
            return Response("Cannot delete genre " + str(genre) + " because it has associated books", status=status.HTTP_400_BAD_REQUEST)
        genre.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

##################################################################################################################################################################################
###############################     SERIES     ###################################################################################################################################
##################################################################################################################################################################################

@api_view(['GET', 'POST'])
def series_list(request):
    if request.method == 'GET':
        data = Series.objects.all()

        serializer = SeriesGetSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SeriesEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE', 'GET'])
def series_detail(request, id):
    try:
        series = Series.objects.get(id=id)
    except Series.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SeriesGetSerializer(series, context={'request': request})

        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = SeriesEditSerializer(series, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if len(series.books.all()) > 0:
            return Response("Cannot delete series " + str(series) + " because it has associated books", status=status.HTTP_400_BAD_REQUEST)
        series.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

## THROW ERROR TEST
@api_view(['PUT','POST','DELETE', 'GET'])
def throw_error(request):
    return Response("RECEIVED " + request.method + " REQUEST", status=status.HTTP_400_BAD_REQUEST)

########################################################################################################################################################
#  __  __           _      _      _ _                         ##########################################################################################
# |  \/  |         (_)    | |    (_) |                         #########################################################################################
# | \  / |_   _ ___ _  ___| |     _| |__  _ __ __ _ _ __ _   _ #########################################################################################
# | |\/| | | | / __| |/ __| |    | | '_ \| '__/ _` | '__| | | |#########################################################################################
# | |  | | |_| \__ \ | (__| |____| | |_) | | | (_| | |  | |_| |#########################################################################################
# |_|  |_|\__,_|___/_|\___|______|_|_.__/|_|  \__,_|_|   \__, |#########################################################################################
#                                                         __/ |#########################################################################################
#                                                        |___/ #########################################################################################
########################################################################################################################################################
########################################################################################################################################################

########################################################################################################################################################
###############################     Songs     ##########################################################################################################
########################################################################################################################################################

@api_view(['GET', 'POST'])
def songs_list(request):
    if request.method == 'GET':
        data = Song.objects.all()

        serializer = SongGetSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SongEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE', 'GET'])
def song_detail(request, id):
    try:
        song = Song.objects.get(id=id)
    except Song.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SongGetSerializer(song, context={'request': request})

        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = SongEditSerializer(song, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        song.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT','DELETE'])
def song_relationship_add_composers(request, id, relationship_id):
    try:
        song = Song.objects.get(id=id)
    except Song.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        composer = People.objects.get(id=relationship_id)
    except People.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        song.composers.add(composer)
    elif request.method == 'DELETE':
        song.composers.remove(composer)

    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT','DELETE'])
def song_relationship_add_arrangers(request, id, relationship_id):
    try:
        song = Song.objects.get(id=id)
    except Song.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        arranger = People.objects.get(id=relationship_id)
    except People.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        song.arrangers.add(arranger)
    elif request.method == 'DELETE':
        song.arrangers.remove(arranger)

    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT','DELETE'])
def song_relationship_add_liricists(request, id, relationship_id):
    try:
        song = Song.objects.get(id=id)
    except Song.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        liricist = People.objects.get(id=relationship_id)
    except People.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        song.lyricists.add(liricist)
    elif request.method == 'DELETE':
        song.lyricists.remove(liricist)

    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT','DELETE'])
def song_relationship_add_tags(request, id, relationship_id):
    try:
        song = Song.objects.get(id=id)
    except Song.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        tag = Tag.objects.get(id=relationship_id)
    except Tag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        song.tags.add(tag)
    elif request.method == 'DELETE':
        song.tags.remove(tag)

    return Response(status=status.HTTP_204_NO_CONTENT)


#############################################################################################################################################################
###############################     PUBLISHERS     ##########################################################################################################
#############################################################################################################################################################

@api_view(['GET', 'POST'])
def publishers_list(request):
    if request.method == 'GET':
        data = Publisher.objects.all()

        serializer = PublisherGetSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PublisherEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE', 'GET'])
def publisher_detail(request, id):
    try:
        publisher = Publisher.objects.get(id=id)
    except Publisher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PublisherGetSerializer(publisher, context={'request': request})

        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = PublisherEditSerializer(publisher, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if len(publisher.songs.all()) > 0:
            return Response("Cannot delete publisher " + str(publisher) + " because it has associated songs", status=status.HTTP_400_BAD_REQUEST)
        publisher.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#############################################################################################################################################################
###############################     PEOPLE     ##############################################################################################################
#############################################################################################################################################################

@api_view(['GET', 'POST'])
def people_list(request):
    if request.method == 'GET':
        data = People.objects.all()

        serializer = PeopleGetSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PeopleEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE', 'GET'])
def people_detail(request, id):
    try:
        people = People.objects.get(id=id)
    except People.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PeopleGetSerializer(people, context={'request': request})

        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = PeopleEditSerializer(people, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if len(people.songs_composed.all()) + len(people.songs_arranged.all()) + len(people.songs_lirisized.all()) > 0:
            return Response("Cannot delete " + str(people) + " because it has associated songs", status=status.HTTP_400_BAD_REQUEST)
        people.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def tag_list(request):
    if request.method == 'GET':
        data = Tag.objects.all()

        serializer = TagGetSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TagEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE', 'GET'])
def tag_detail(request, id):
    try:
        tag = Tag.objects.get(id=id)
    except Tag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TagGetSerializer(tag, context={'request': request})

        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = TagEditSerializer(tag, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        tag.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)