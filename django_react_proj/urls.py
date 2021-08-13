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

from functools import partial

urlpatterns = [
    path('admin/', admin.site.urls),
    ##### BOOKLIBRARY
    #BOOKS
    re_path(r'^api/booklibrary/books$', views.books_list),
    re_path(r'^api/booklibrary/total_books$', views.total_books),
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
    path(r'api/musiclibrary/songs/<int:id>/composers/<int:relationship_id>', views.song_relationship_add_composers),
    path(r'api/musiclibrary/songs/<int:id>/lyricists/<int:relationship_id>', views.song_relationship_add_liricists),
    path(r'api/musiclibrary/songs/<int:id>/arrangers/<int:relationship_id>', views.song_relationship_add_arrangers),
    path(r'api/musiclibrary/songs/<int:id>/tags/<str:tag_name>', views.song_relationship_add_tags),
    #PUBLISHERS
    re_path(r'^api/musiclibrary/publishers$', views.publishers_list),
    path(r'api/musiclibrary/publishers/<int:id>', views.publisher_detail),
    #COLLECTIONS
    re_path(r'^api/musiclibrary/collections$', views.collections_list),
    path(r'api/musiclibrary/collections/<int:id>', views.collection_detail),
    # PEOPLE
    re_path(r'^api/musiclibrary/people$', views.people_list),
    path(r'api/musiclibrary/people/<int:id>', views.people_detail),
    # TAGS
    re_path(r'^api/musiclibrary/tags$', views.tag_list),
    path(r'api/musiclibrary/tags/<int:id>', views.tag_detail),
    # DATES
    re_path(r'^api/musiclibrary/dates$', views.date_list),
    path(r'api/musiclibrary/dates/<int:id>', views.date_detail),
    #TESTERROR
    re_path(r'^api/booklibrary/throwerror$', views.throw_error),
]
