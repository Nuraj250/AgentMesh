import asyncio
from database import db

async def reset():
    result = await db["workflows"].delete_many({})
    print(f"🧹 Deleted {result.deleted_count} workflows.")

if __name__ == "__main__":
    asyncio.run(reset())
