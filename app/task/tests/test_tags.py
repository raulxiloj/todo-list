from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Tag

from task.serializers import TagSerializer

TAGS_URL = reverse('task:tag-list')


class TagsApiTests(TestCase):
    """Test the tags available"""

    def setUp(self):
        self.client = APIClient()

    def test_retrieve_tags(self):
        """Test retrieving tags"""
        Tag.objects.create(name='Work')
        Tag.objects.create(name='Home')

        res = self.client.get(TAGS_URL)

        tags = Tag.objects.all().order_by('-name')
        serializer = TagSerializer(tags, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
