FROM node:alpine
COPY . /dj
WORKDIR /dj
CMD python manage.py runserver
