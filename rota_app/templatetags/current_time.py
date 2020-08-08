import datetime
from django import template

register = template.Library()

@register.simple_tag
def current_time(date, shifts):
    for key, value in shifts.items():
        if key == date:
            return value