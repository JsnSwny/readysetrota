release: python manage.py migrate
web: gunicorn rotaready.wsgi --log-file -
celery: celery -A rotaready worker -l info