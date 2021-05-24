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
    ##### BOOKLIBRARY
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
    ##### MUSICLIBRARY
    #SONGS
    re_path(r'^api/musiclibrary/songs$', views.songs_list),
    path(r'api/musiclibrary/songs/<int:id>', views.song_detail),
    path(r'api/musiclibrary/songs/<int:id>/composers/<int:composer_id>', views.song_detail),
    path(r'api/musiclibrary/songs/<int:id>/lyracists/<int:lyracist_id>', views.song_detail),
    # #COMPOSERS
    # re_path(r'^api/musiclibrary/composers$', views.composers_list),
    # path(r'api/musiclibrary/composers/<int:id>', views.composer_detail),
    #PUBLISHERS
    re_path(r'^api/musiclibrary/publishers$', views.publishers_list),
    path(r'api/musiclibrary/publishers/<int:id>', views.publisher_detail),
    # #LYRACISTS
    # re_path(r'^api/musiclibrary/lyracists$', views.lyracists_list),
    # path(r'api/musiclibrary/lyracists/<int:id>', views.lyracist_detail),
    # PEOPLE
    re_path(r'^api/musiclibrary/people$', views.people_list),
    path(r'api/musiclibrary/people/<int:id>', views.people_detail),
    #TESTERROR
    re_path(r'^api/booklibrary/throwerror$', views.throw_error),
]
