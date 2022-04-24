from django.db import models


class Tag(models.Model):
    """Tag to be used for a task"""
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Task(models.Model):
    """Task object"""
    description = models.CharField(max_length=255)
    status = models.BooleanField(default=False)
    tags = models.ManyToManyField('Tag')

    def __str__(self):
        return self.description
