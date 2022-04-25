from rest_framework import viewsets, mixins

from core.models import Tag, Task
from task import serializers


class TagViewSet(viewsets.GenericViewSet, mixins.ListModelMixin,
                 mixins.CreateModelMixin):
    """Manage tags in the database"""
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer


class TaskViewSet(viewsets.GenericViewSet, mixins.ListModelMixin,
                  mixins.CreateModelMixin):
    """Manage task in db"""
    serializer_class = serializers.TaskSerializer
    queryset = Task.objects.all()
