import asyncio
from database import db

async def seed():
    agents = [
        { "id": "agent_1", "name": "Summarizer", "role": "Summarizes input text", "tools": ["web_search"], "icon": "/agent-icon.png", "position": {"x":100, "y":200} },
        { "id": "agent_2", "name": "Critic", "role": "Reviews summaries", "tools": ["embedding_search"], "icon": "/agent-icon.png", "position": {"x":300, "y":200} },
        { "id": "agent_3", "name": "Reporter", "role": "Formats output", "tools": ["formatting"], "icon": "/agent-icon.png", "position": {"x":500, "y":200} }
    ]

    connections = [
        {"from_agent": "user", "to_agent": "agent_1"},
        {"from_agent": "agent_1", "to_agent": "agent_2"},
        {"from_agent": "agent_2", "to_agent": "agent_3"}
    ]

    workflow = {
        "id": "workflow_1",
        "user_id": "demo_user",
        "agents": agents,
        "connections": connections
    }

    await db["workflows"].delete_many({"id": "workflow_1"})
    await db["workflows"].insert_one(workflow)
    print("✅ Seeded initial workflow.")

if __name__ == "__main__":
    asyncio.run(seed())
