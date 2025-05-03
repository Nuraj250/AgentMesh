from database import db
from agent_runner import run_agent
import socketio

sio = socketio.AsyncServer(async_mode="asgi")

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio.event
async def start_workflow(sid, data):
    """
    Expects: { "workflow_id": "xyz", "input": "user input" }
    """
    workflow = await db["workflows"].find_one({"id": data["workflow_id"]})
    if not workflow:
        await sio.emit('error', {'message': 'Workflow not found'}, room=sid)
        return

    agents = {agent['id']: agent for agent in workflow['agents']}
    connections = workflow['connections']
    input_data = data['input']

    # Start from user node
    current_agent_id = next((conn['to_agent'] for conn in connections if conn['from_agent'] == 'user'), None)

    while current_agent_id:
        agent = agents[current_agent_id]
        await sio.emit('agent_started', {'agent_id': current_agent_id}, room=sid)

        output = await run_agent(agent, input_data)
        await sio.emit('agent_completed', {'agent_id': current_agent_id, 'output': output}, room=sid)

        next_conn = next((conn for conn in connections if conn['from_agent'] == current_agent_id), None)
        current_agent_id = next_conn['to_agent'] if next_conn else None
        input_data = output if next_conn else input_data

    await sio.emit('workflow_completed', {'message': 'Workflow execution finished.'}, room=sid)
