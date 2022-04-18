from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
)
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated,
)
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from ..models import Room, Booking
from datetime import date
from .serializers import RoomListSerializer, BookingSerializer, BookingListSerializer


class RoomListAPIView(ListAPIView):
    queryset = Room.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = RoomListSerializer


class RoomDetailAPIView(RetrieveAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomListSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        pk = self.kwargs["pk"]
        book = get_object_or_404(Room, pk=pk)
        return book


class BookingListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BookingListSerializer

    def get_queryset(self, *args, **kwargs):
        today = date.today()
        authUser = self.request.user
        booking_list = Booking.objects.filter(user=authUser, scheduled_at__gte=today)
        return booking_list


class BookingCreateAPIView(CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        authUser = self.request.user
        room_id = self.request.data.get("room_id")
        scheduled_at = self.request.data.get("scheduled_at")
        time_slot = self.request.data.get("time_slot")
        booking = Booking.objects.filter(scheduled_at=scheduled_at, time_slot=time_slot)
        if booking.exists():
            raise ValidationError("Booking already exist.")
        else:
            serializer.save(room_id=room_id, user=authUser)


class BookingDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        authUser = request.user
        id = request.data.get("id")
        try:
            booking = Booking.objects.get(user=authUser, id=id)
            booking.delete()
            return Response({"data": "Booking being removed"}, status=200)
        except Booking.DoesNotExist:
            return Response(err_msg="Resource is not found.", status=404)
