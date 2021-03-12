from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from .serializers import *

#################################################################################################################################################################################################
###############################     BOOKS     ###################################################################################################################################################
#################################################################################################################################################################################################

@api_view(['GET', 'POST'])
def books_list(request):
    if request.method == 'GET':
        data = Book.objects.all()

        serializer = BookSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BookSerializer(data=request.data)
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
        serializer = BookSerializer(book, context={'request': request}, many=True)

        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = BookSerializer(book, data=request.data,context={'request': request})
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
        serializer = AuthorGetSerializer(author, context={'request': request}, many=True)

        return Response(serializer.data)


    if request.method == 'PUT':
        serializer = AuthorEditSerializer(author, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
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
        serializer = GenreGetSerializer(genre, context={'request': request}, many=True)

        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = GenreEditSerializer(genre, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
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
        serializer = SeriesGetSerializer(series, context={'request': request}, many=True)

        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = SeriesEditSerializer(series, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        series.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)