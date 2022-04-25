from rest_framework import viewsets, mixins

from core.models import Tag, Task
from task import serializers


class TagViewSet(viewsets.GenericViewSet, mixins.ListModelMixin,
                 mixins.CreateModelMixin):
    """Manage tags in the database"""
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """Manage task in db"""
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer

    def get_serializer_class(self):
        """Return appropiate serializer class"""
        if self.action == 'list' or self.action == 'retrieve':
            return serializers.TaskListSerializer

        return self.serializer_class
