from django.db import models

# Create your models here.
# ********************************************************************************************************
# ******************************************* BOOK LIBRARY ***********************************************
# ********************************************************************************************************


class Author(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


class Genre(models.Model):
    category = models.CharField(max_length=200)

    def __str__(self):
        return str(self.category)


class Series(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return str(self.name)


class Book(models.Model):
    title = models.CharField(max_length=200)
    notes = models.CharField(
        max_length=5000, default="No notes", blank=True, null=True)
    author = models.ForeignKey(
        Author, on_delete=models.CASCADE, related_name='books')
    genre = models.ForeignKey(
        Genre, on_delete=models.PROTECT, related_name='books')
    series = models.ForeignKey(
        Series, on_delete=models.PROTECT, blank=True, null=True, related_name='books')
    number_in_series = models.IntegerField(null=True, blank=True)
    owned = models.BooleanField(default=True)

    def __str__(self):
        return str(self.title)


# ********************************************************************************************************
# ******************************************* MUSIC LIBRARY **********************************************
# ********************************************************************************************************

class People(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


class Publisher(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return "{}".format(self.name)

class Collection(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return "{}".format(self.name)

class Song(models.Model):
    title = models.CharField(max_length=200)
    composers = models.ManyToManyField(
        People, related_name="songs_composed", blank=True)
    arrangers = models.ManyToManyField(
        People, related_name="songs_arranged", blank=True)
    lyricists = models.ManyToManyField(
        People, related_name="songs_lirisized", blank=True)
    publisher = models.ForeignKey(
        Publisher, on_delete=models.PROTECT, related_name='songs')
    collection = models.ForeignKey(
        Collection, on_delete=models.PROTECT, related_name='songs', blank=True, null=True
    )
    notes = models.CharField(max_length=5000, blank=True, null=True)

    def __str__(self):
        return str(self.title)


class DateSung(models.Model):
    date = models.DateField()
    description = models.CharField(max_length=500, blank=True, null=True)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)

    def __str__(self):
        return str("Song {} Sung on {}".format(self.song.title, self.date))


class Tag(models.Model):
    tag = models.CharField(max_length=200)
    songs = models.ManyToManyField(Song, related_name="tags")

    def __str__(self):
        return str(self.tag)



