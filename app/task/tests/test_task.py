from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Task

from task.serializers import TaskSerializer

TASK_URL = reverse('task:task-list')


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
        sample_task(description='Watch an episode of The Office')

        res = self.client.get(TASK_URL)

        tasks = Task.objects.all().order_by('id')
        serializer = TaskSerializer(tasks, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
