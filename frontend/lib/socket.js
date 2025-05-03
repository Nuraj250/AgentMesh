import { io } from "socket.io-client";

const socket = io("http://localhost:8000"); // adjust if backend runs elsewhere

export default socket;
