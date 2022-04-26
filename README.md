# Todo List

Simple Todo List where you can create tasks, check them as done, edit the description and delete them. This project was made with React, Django, MySql and Docker.

## Run the project
As we use Docker there´s the advantage that everything you need to run this project is `Docker`. There are two separate containers one for the backend and one for the frontend. To run both I used `Docker-Compose`. 

```
docker-compose up --build
```
- This command will up the two 'services' defined in the `docker-compose.yml` file. 

<p align="center">
    <img src="https://user-images.githubusercontent.com/30850990/165311939-1eece436-6349-44ee-be02-e5be87dcd612.png" width="700">
</p>

The API is running on the port 8000 in localhost. And the frontend is running on a nginx so the default port is 80.

<p align="center">
    <img src="https://user-images.githubusercontent.com/30850990/165313156-c65d3809-5c31-49ae-98e0-a1f7c34fcf5f.png" >
</p>

<p align="center">
    <img src="https://user-images.githubusercontent.com/30850990/165313164-b4b029b5-fa7d-4410-bd95-0aab16d47467.png" >
</p>

# API description

Besides the default tables that django creates the tables added with the models created are the following ones:

<p align="center">
    <img src="https://user-images.githubusercontent.com/30850990/165313846-249f5094-9463-4901-913d-9443476915a4.png" >
</p>

### Endpoints created for tasks 
**Create**
- This endpoint is for creating a new task
```
POST: /api/task/tasks
body: {
    description: "Testing the API",
    status: false,
    tags: [1] #optional, #This field can be sended as an empty array
}
```

**List**
- This endpoint is for list all the tasks created with their tags associated
```
GET: /api/task/tasks
```

**Update**
- This endpoint is for updating certain fields of the task (status, description, tags)
```
PATCH: /api/task/tasks/:id
{
    status: true
}
```

**Delete**
- This endpoint is for deleting a task
```
DELETE /api/task/tasks/:id
```

--- 

To follow the python standard I used a package named `flake8` which check your code for identation, spaces, comments, length of a line, etc. 

Also I try to follow TDD which is in generally words to make a test first and then create the code to that test pass.

### Commands runned
- To start django project
    ```
    django-admin startproject app .
    ```

- To create a module
    ```
    python manage.py startapp core
    ```

- For migrations
    ```
    python manage.py makemigrations core

    python manage.py migrate
    ```

- To run the server
    ```
    python manage.py runserver 0.0.0.0:8000
    ```

## Simple video running the app
https://user-images.githubusercontent.com/30850990/165319581-250b1605-4998-4981-a41d-79a4ad05813c.mov

## Tools used
- Django
    + djangorestframework
    + flake8
    + django-cors-headers
    + mysqlclient
- React
- Docker and docker-compose
- Mysql

## References
- https://www.django-rest-framework.org/tutorial/6-viewsets-and-routers/
- https://docs.djangoproject.com/en/2.1/ref/models/fields/#django.db.models.ManyToManyField
- https://docs.djangoproject.com/en/1.8/ref/django-admin/
- https://realpython.com/django-migrations-a-primer/
- https://testdriven.io/blog/drf-views-part-1/
