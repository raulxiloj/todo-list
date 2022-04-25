from rest_framework import serializers

from core.models import Tag, Task


class TagSerializer(serializers.ModelSerializer):
    """Serializer for tag objects"""

    class Meta:
        model = Tag
        fields = ('id', 'name')
        read_only_fields = ('id',)


class TaskSerializer(serializers.ModelSerializer):
    """Serialize a task"""

    tags = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all()
    )

    class Meta:
        model = Task
        fields = ('id', 'description', 'status', 'tags')
        read_only_fields = ('id',)
