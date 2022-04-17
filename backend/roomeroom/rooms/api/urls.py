from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^$", views.RoomListAPIView.as_view(), name="list"),
    url(
        r"^(?P<pk>\d+)/$",
        views.RoomDetailAPIView.as_view(),
        name="room",
    ),
    url(
        r"^booking/$",
        views.BookingListAPIView.as_view(),
        name="booking_list",
    ),
    url(
        r"^booking/create/$",
        views.BookingCreateAPIView.as_view(),
        name="booking_create",
    ),
    url(
        r"^booking/delete/$",
        views.BookingDeleteAPIView.as_view(),
        name="booking_delete",
    ),
    # url(
    #     r"^bookings/(?P<pk>\d+)/$",
    #     views.BookingDetailAPIView.as_view(),
    #     name="booking",
    # ),
]
