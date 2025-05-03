from fastapi import FastAPI, HTTPException
from socket_events import sio
from fastapi.middleware.cors import CORSMiddleware
from database import db
from pydantic import BaseModel
import socketio

app = FastAPI()

# CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Socket.IO
socket_app = socketio.ASGIApp(sio, app)

# API for saving workflows
class SaveWorkflowRequest(BaseModel):
    id: str
    user_id: str
    agents: list
    connections: list

@app.post("/api/workflows")
async def save_workflow(payload: SaveWorkflowRequest):
    await db["workflows"].delete_many({"id": payload.id})
    await db["workflows"].insert_one(payload.dict())
    return {"message": "Workflow saved successfully."}

# API for loading workflows
@app.get("/api/workflows/{workflow_id}")
async def get_workflow(workflow_id: str):
    workflow = await db["workflows"].find_one({"id": workflow_id})
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return workflow
