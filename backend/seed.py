import asyncio
from database import db

async def seed():
    agents = [
        { "id": "agent_1", "name": "Summarizer", "role": "Summarizes input text", "tools": ["web_search"] },
        { "id": "agent_2", "name": "Critic", "role": "Reviews and improves summary", "tools": ["embedding_search"] },
        { "id": "agent_3", "name": "Reporter", "role": "Formats the final report", "tools": ["formatting"] }
    ]

    connections = [
        {"from_agent": "user", "to_agent": "agent_1"},
        {"from_agent": "agent_1", "to_agent": "agent_2"},
        {"from_agent": "agent_2", "to_agent": "agent_3"}
    ]

    workflow = {
        "id": "workflow_1",
        "user_id": "demo_user_1",
        "agents": agents,
        "connections": connections
    }

    await db["workflows"].delete_many({"id": "workflow_1"})
    await db["workflows"].insert_one(workflow)
    print("✅ Seeded workflow successfully.")

if __name__ == "__main__":
    asyncio.run(seed())
