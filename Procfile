release: python manage.py migrate
web: gunicorn rotaready.wsgi --log-file -
worker: celery -A rotaready worker -l info