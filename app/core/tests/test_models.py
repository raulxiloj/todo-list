from django.test import TestCase

from core import models


class ModelTests(TestCase):

    def test_tag_str(self):
        """Test the tag string"""
        tag = models.Tag.objects.create(
            name='Home'
        )

        self.assertEqual(str(tag), tag.name)
