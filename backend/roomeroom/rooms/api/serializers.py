from rest_framework.serializers import ModelSerializer, SerializerMethodField

from ..models import Room, Booking
from users.api.serializers import UserLoadSerializer
from datetime import date, datetime
from django.utils import timezone


class BookingSerializer(ModelSerializer):
    user = UserLoadSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ("id", "room_id", "user", "scheduled_at", "time_slot", "active")


class RoomListSerializer(ModelSerializer):
    status = SerializerMethodField()
    bookings = BookingSerializer(many=True, source="booking_set")

    class Meta:
        model = Room
        fields = ("id", "room_name", "status", "bookings")

    def get_status(self, obj):
        today = timezone.localdate()
        local = timezone.localtime()
        currentHour = local.strftime("%H:00")
        print(today, local, currentHour)
        bookings = obj.booking_set.filter(scheduled_at=today, time_slot=currentHour)
        if bookings.exists():
            return "Busy"
        else:
            return "Available"
