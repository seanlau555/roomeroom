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
from .serializers import RoomListSerializer, BookingSerializer


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
    serializer_class = BookingSerializer

    def get_queryset(self, *args, **kwargs):
        today = date.today()
        authUser = self.request.user
        booking_list = Booking.objects.filter(user=authUser, scheduled_at__gte=today)
        print(booking_list)
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
        print(113, scheduled_at, time_slot)
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

        # # request.data["user"] = {"id": request.user.id}
        # request.data["user_id"] = request.user.id
        # print(request.data, request.user)
        # return self.create(request, *args, **kwargs)

    # def create(self, request):
    #     print(request)

    # queryset = .objects.filter(user=self.request.user)
    # if queryset.exists():
    #     raise ValidationError("You have already signed up")
    # serializer.save(user=self.request.user)


# class BookingCreateAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         print (request)
#         authUser = request.user
#         action = request.data.get("action")
#         planType = request.data.get("planType", default="monthly")
#         if action != "restore":
#             return ResponseResult(err_msg="Invalid response", status=404)
#         billing_profile, _ = BillingProfile.objects.new_or_get(request)
#         if billing_profile is None:
#             return ResponseResult(err_msg="User has no billing profile", status=404)
#         # sparksine_sub = billing_profile.get_subscription
#         # if not sparksine_sub:
#         # return ResponseResult(
#         # err_msg="User has no recent subscription", status=404
#         # )

#         has_card = billing_profile.has_card
#         if has_card and (
#             authUser.get_payment_status == "canceled"
#             or authUser.get_payment_status == "unpaid"
#             or authUser.get_payment_status == "free"
#         ):
#             did_charge = billing_profile.subscribe(planType)
#             if did_charge:
#                 return ResponseResult(
#                     data={"success": "Successfully restore"}, status=200
#                 )
#             else:
#                 return ResponseResult(err_msg="Error is restoring", status=404)


# # class BookingDetailAPIView(RetrieveAPIView):
# #     queryset = Booking.objects.all()
# #     serializer_class = BookingSerializer
# #     permission_classes = [IsAuthenticated]

# #     def get_object(self):
# #         # authUser = self.request.user
# #         queryset = self.get_queryset()
# #         pk = self.kwargs["pk"]
# #         print(22, pk)
# #         book = get_object_or_404(Room, pk=pk)
# #         print(book, pk)
# #         return book

# #         # pk = self.kwargs["pk"]
# #         # queryset = self.get_queryset()
# #         # book = get_object_or_404(Booking, pk=pk)
# #         # obj = get_object_or_404(queryset, pk=pk)
# #         # print(book, obj)
# #         # try:
# #         #     uuid.UUID(userId)
# #         # except ValueError:
# #         #     raise Http404("No MyModel matches the given query.")
