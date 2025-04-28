from fastapi import FastAPI
from socket_events import sio
from fastapi.middleware.cors import CORSMiddleware
import socketio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

socket_app = socketio.ASGIApp(sio, app)
