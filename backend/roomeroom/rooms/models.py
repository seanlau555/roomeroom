from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


# Create your models here.
class Room(models.Model):
    room_name = models.CharField(
        max_length=255,
    )


class Booking(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    scheduled_at = models.DateField(auto_now=False, auto_now_add=False)
    time_slot = models.CharField(
        max_length=255,
    )
    active = models.BooleanField(default=False)
