from django.test import TestCase

from core import models


class ModelTests(TestCase):

    def test_tag_str(self):
        """Test the tag string"""
        tag = models.Tag.objects.create(
            name='Home'
        )

        self.assertEqual(str(tag), tag.name)

    def test_task_str(self):
        """Test the task string"""
        task = models.Task.objects.create(
            description='Finish this API',
            status=False
        )

        self.assertEqual(str(task), task.description)
