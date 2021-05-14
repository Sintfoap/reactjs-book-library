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
################################################################################################################################################################################
#|)    |         ###############################################################################################################################################################
#|)OOK |__IBRARY ###############################################################################################################################################################
################################################################################################################################################################################

#################################################################################################################################################################################################
###############################     BOOKS     ###################################################################################################################################################
#################################################################################################################################################################################################

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
            return Response(status=status.HTTP_201_CREATED)
            
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



#################################################################################################################################################################################################
###############################     AUTHORS     #################################################################################################################################################
#################################################################################################################################################################################################

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
            return Response(status=status.HTTP_201_CREATED)
            
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

#################################################################################################################################################################################################
###############################     GENRES     ##################################################################################################################################################
#################################################################################################################################################################################################

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
            return Response(status=status.HTTP_201_CREATED)
        
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

#################################################################################################################################################################################################
###############################     SERIES     ##################################################################################################################################################
#################################################################################################################################################################################################

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
            return Response(status=status.HTTP_201_CREATED)
            
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

################################################################################################################################################################################
# /\  /\      |         ########################################################################################################################################################
#/  \/  \USIC |__IBRARY ########################################################################################################################################################
################################################################################################################################################################################

################################################################################################################################################################################
###############################     Songs     ##################################################################################################################################
################################################################################################################################################################################

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
            return Response(status=status.HTTP_201_CREATED)
            
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

#################################################################################################################################################################################################
###############################     COMPOSERS     #################################################################################################################################################
#################################################################################################################################################################################################

@api_view(['GET', 'POST'])
def composers_list(request):
    if request.method == 'GET':
        data = Composer.objects.all()

        serializer = ComposerGetSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ComposerEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE', 'GET'])
def composer_detail(request, id):
    try:
        composer = Composer.objects.get(id=id)
    except Composer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ComposerGetSerializer(composer, context={'request': request})

        return Response(serializer.data)


    if request.method == 'PUT':
        serializer = ComposerEditSerializer(composer, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if len(composer.songs.all()) > 0:
            return Response("Cannot delete composer " + str(composer) + " because it has associated songs", status=status.HTTP_400_BAD_REQUEST)
        composer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#################################################################################################################################################################################################
###############################     PUBLISHERS     ##################################################################################################################################################
#################################################################################################################################################################################################

@api_view(['GET', 'POST'])
def publisher_list(request):
    if request.method == 'GET':
        data = Publisher.objects.all()

        serializer = PublisherGetSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PublisherEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        
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

#################################################################################################################################################################################################
###############################     ARRANGERS     ##################################################################################################################################################
#################################################################################################################################################################################################

@api_view(['GET', 'POST'])
def arrangers_list(request):
    if request.method == 'GET':
        data = Series.objects.all()

        serializer = ArrangerGetSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ArrangerEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE', 'GET'])
def arranger_detail(request, id):
    try:
        arranger = Arranger.objects.get(id=id)
    except Arranger.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ArrangerGetSerializer(arranger, context={'request': request})

        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = ArrangerEditSerializer(arranger, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if len(arranger.songs.all()) > 0:
            return Response("Cannot delete arranger " + str(arranger) + " because it has associated songs", status=status.HTTP_400_BAD_REQUEST)
        arranger.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
