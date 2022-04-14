from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

rooms_db = [
    {"room_id": "C01"},
    {"room_id": "C02"},
    {"room_id": "C03"},
    {"room_id": "C04"},
    {"room_id": "C05"},
    {"room_id": "C06"},
    {"room_id": "C07"},
    {"room_id": "C08"},
    {"room_id": "C09"},
    {"room_id": "C10"},
    {"room_id": "P01"},
    {"room_id": "P02"},
    {"room_id": "P03"},
    {"room_id": "P04"},
    {"room_id": "P05"},
    {"room_id": "P06"},
    {"room_id": "P07"},
    {"room_id": "P08"},
    {"room_id": "P09"},
    {"room_id": "P10"},
]


class Booking(BaseModel):
    username: str
    description: str | None = None
    room_id: str
    date: str
    timeslot: str


@app.get("/rooms")
async def get_room_list():
    return {"message": "Hello World"}


@app.post("/booking")
async def create_booking(booking: Booking):
    return booking


@app.get("/rooms/{room_id}")
async def get_room(room_id: int):
    print(111, room_id)
    return {"message": room_id}
