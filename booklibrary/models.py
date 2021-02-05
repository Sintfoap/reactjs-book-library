from django.db import models

# Create your models here.
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
    notes = models.CharField(max_length=5000, default="No notes", blank=True, null=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    genre = models.ForeignKey(Genre, on_delete=models.PROTECT, related_name='books')
    series = models.ForeignKey(Series, on_delete=models.PROTECT, blank=True, null=True, related_name='books')

    def __str__(self):
        return str(self.title)