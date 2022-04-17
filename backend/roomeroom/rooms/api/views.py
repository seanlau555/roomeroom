from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
)
from rest_framework.permissions import (
    IsAuthenticated,
)
from ..models import Room, Booking
from .serializers import RoomListSerializer


class RoomListAPIView(ListAPIView):
    queryset = Room.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = RoomListSerializer


class RoomDetailAPIView(RetrieveAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomListSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # authUser = self.request.user
        # queryset = self.get_queryset()
        pk = self.kwargs["pk"]
        book = get_object_or_404(Room, pk=pk)
        print(book, pk)
        return book


# class BookingDetailAPIView(RetrieveAPIView):
#     queryset = Booking.objects.all()
#     serializer_class = BookingSerializer
#     permission_classes = [IsAuthenticated]

#     def get_object(self):
#         # authUser = self.request.user
#         queryset = self.get_queryset()
#         pk = self.kwargs["pk"]
#         print(22, pk)
#         book = get_object_or_404(Room, pk=pk)
#         print(book, pk)
#         return book

#         # pk = self.kwargs["pk"]
#         # queryset = self.get_queryset()
#         # book = get_object_or_404(Booking, pk=pk)
#         # obj = get_object_or_404(queryset, pk=pk)
#         # print(book, obj)
#         # try:
#         #     uuid.UUID(userId)
#         # except ValueError:
#         #     raise Http404("No MyModel matches the given query.")
