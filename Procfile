release: python manage.py migrate
web: gunicorn rotaready.wsgi --log-file -
celery: celery worker -A forum -l info -c 4