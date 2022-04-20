FROM python:3.10-alpine

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /app
WORKDIR /app

COPY ./app /app

#docker build -t raulxiloj/todo-api-django .
#docker run -it -v "/$(pwd)/app:/app" raulxiloj/todo-api-django sh