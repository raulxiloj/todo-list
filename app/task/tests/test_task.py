from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Task, Tag

from task.serializers import TaskListSerializer

TASK_URL = reverse('task:task-list')


def sample_tag(name='Learning'):
    """Create and return a sample tag"""
    return Tag.objects.create(name=name)


def sample_task(**params):
    """create and return a sample task"""
    defaults = {
        'description': 'Make homework'
    }
    defaults.update(params)

    return Task.objects.create(**defaults)


class TaskApiTests(TestCase):
    """Test tasks"""

    def setUp(self):
        self.client = APIClient()

    def test_retrieve_tasks(self):
        sample_task()
        task = sample_task(description='Watch an episode of The Office')
        task.tags.add(sample_tag())

        res = self.client.get(TASK_URL)

        tasks = Task.objects.all().order_by('id')
        serializer = TaskListSerializer(tasks, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_basic_task(self):
        """Task without tags"""
        data = {
            'description': 'Take a walk with the dogs'
        }

        res = self.client.post(TASK_URL, data)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        task = Task.objects.get(id=res.data['id'])
        self.assertEqual(data['description'], task.description)

    def test_create_task_with_tags(self):
        """Test creating a task with tags"""
        tag1 = sample_tag()
        tag2 = sample_tag('Work')

        data = {
            'description': 'Django tech',
            'tags': [tag1.id, tag2.id]
        }

        res = self.client.post(TASK_URL, data)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        task = Task.objects.get(id=res.data['id'])
        tags = task.tags.all()
        self.assertEqual(tags.count(), 2)
        self.assertIn(tag1, tags)
        self.assertIn(tag2, tags)
