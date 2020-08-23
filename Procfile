release: python manage.py migrate
web: gunicorn rotaready.wsgi --log-file -
woker: celery -A rotaready worker -l info