from django.contrib import admin
from django.urls import path, include
from rota_app.views import CheckUUID, RetrieveSubscription, UpdateSubscription, GetPopularTimes, RetrieveUpcomingInvoice, Publish, CreateCheckoutSession, SendForApproval, ApproveShifts, ExportShifts, ExportAllShifts, Charge, Cancel, webhook, getCustomer, sendMessage, GetStats, GetTimeclock, GetReportData
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-view/checkuuid', CheckUUID.as_view(), name='checkuuid'),
    path('api-view/getpopulartimes', GetPopularTimes.as_view(), name='getpopulartimes'),
    path('api-view/publish/', Publish.as_view(), name='publish'),
    path('api-view/approveshifts/', ApproveShifts.as_view(), name='approveshifts'),
    path('api-view/sendforapproval/', SendForApproval.as_view(), name='sendforapproval'),
    path('export', ExportShifts.as_view(), name='export'),
    path('exportall', ExportAllShifts.as_view(), name='exportall'),
    path('api/', include('rota_app.urls')),
    path('charge/', Charge.as_view(), name='charge'),
    path('getCustomer/', getCustomer.as_view(), name='getCustomer'),
    path('cancel/', Cancel.as_view(), name='cancel'),
    path('sendmessage/', sendMessage.as_view(), name='sendMessage'),
    path('webhook/', webhook, name='webhook'),
    # path('stats/', GetStats.as_view(), name='stats'),
    path('timeclock/', GetTimeclock.as_view(), name='timeclock'),
    # path('api-view/report/', GetReportData.as_view(), name='report'),


    # Subscription
    path('create-checkout-session/', CreateCheckoutSession.as_view(), name='createCheckoutSession'),
    path('retrieve-upcoming-invoice/', RetrieveUpcomingInvoice.as_view(), name='retrieveUpcomingInvoice'),
    path('update-subscription/', UpdateSubscription.as_view(), name='updatedSubscription'),
    path('retrieve-subscription/', RetrieveSubscription.as_view(), name='retrieveSubscription'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('', include('accounts.urls')),
    path('', include('frontend.urls')),
]