from django.contrib import admin
from django.urls import path, include
from rota_app.views import CheckUUID, GetPopularTimes, Publish
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-view/checkuuid', CheckUUID.as_view(), name='checkuuid'),
    path('api-view/getpopulartimes', GetPopularTimes.as_view(), name='getpopulartimes'),
    path('api-view/publish', Publish.as_view(), name='publish'),
    path('api/', include('rota_app.urls')),
    
    
    
    
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('', include('accounts.urls')),
    path('', include('frontend.urls')),
]