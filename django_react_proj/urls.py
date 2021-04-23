"""django_react_proj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from booklibrary import views

urlpatterns = [
    path('admin/', admin.site.urls),
    #BOOKS
    re_path(r'^api/booklibrary/books$', views.books_list),
    path(r'api/booklibrary/books/<int:id>', views.book_detail),
    #AUTHORS
    re_path(r'^api/booklibrary/authors$', views.authors_list),
    path(r'api/booklibrary/authors/<int:id>', views.author_detail),
    #GENRES
    re_path(r'^api/booklibrary/genres$', views.genre_list),
    path(r'api/booklibrary/genres/<int:id>', views.genre_detail),
    #SERIES
    re_path(r'^api/booklibrary/series$', views.series_list),
    path(r'api/booklibrary/series/<int:id>', views.series_detail),
    #TESTERROR
    re_path(r'^api/booklibrary/throwerror$', views.throw_error),
]
