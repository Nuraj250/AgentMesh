import openai
import os
from dotenv import load_dotenv
from utils import call_tool

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

async def run_agent(agent, input_data):
    system_prompt = f"You are a {agent['role']}. You have access to these tools: {', '.join(agent['tools'])}."

    # Preprocess input with tools if any
    for tool in agent.get('tools', []):
        input_data = await call_tool(tool, input_data)

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": input_data}
    ]

    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=messages
    )
    return response['choices'][0]['message']['content']
