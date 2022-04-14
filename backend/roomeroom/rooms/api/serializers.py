from rest_framework.serializers import ModelSerializer, SerializerMethodField

from ..models import Booking
from users.api.serializers import UserLoadSerializer


class BookingSerializer(ModelSerializer):
    user = UserLoadSerializer()

    class Meta:
        model = Booking
        fields = ("id", "room_id", "user", "scheduled_at", "time_slot", "active")
