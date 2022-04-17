from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^$", views.RoomListAPIView.as_view(), name="list"),
    url(
        r"^(?P<pk>\d+)/$",
        views.RoomDetailAPIView.as_view(),
        name="room",
    ),
    # url(
    #     r"^bookings/(?P<pk>\d+)/$",
    #     views.BookingDetailAPIView.as_view(),
    #     name="booking",
    # ),
]
