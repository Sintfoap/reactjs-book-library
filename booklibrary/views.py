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
        print(request.data)
        serializer = BookSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE'])
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

        serializer = AuthorSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def author_detail(request, id):
    try:
        author = Author.objects.get(id=id)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AuthorSerializer(author, context={'request': request}, many=True)

        return Response(serializer.data)


    if request.method == 'PUT':
        serializer = AuthorSerializer(author, data=request.data,context={'request': request})
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

        serializer = GenreSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = GenreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def genre_detail(request, id):
    try:
        genre = Genre.objects.get(id=id)
    except Genre.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GenreSerializer(genre, context={'request': request}, many=True)

        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = GenreSerializer(genre, data=request.data,context={'request': request})
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

        serializer = SeriesSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SeriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def series_detail(request, id):
    try:
        series = Series.objects.get(id=id)
    except Series.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SeriesSerializer(series, context={'request': request}, many=True)

        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = SeriesSerializer(series, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        series.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)