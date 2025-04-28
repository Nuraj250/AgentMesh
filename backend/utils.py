async def call_tool(tool_name, input_data):
    if tool_name == "web_search":
        return await fake_web_search(input_data)
    elif tool_name == "embedding_search":
        return await embedding_lookup(input_data)
    elif tool_name == "pdf_reader":
        return await read_pdf(input_data)
    elif tool_name == "formatting":
        return format_output(input_data)
    else:
        return input_data

async def fake_web_search(query):
    return f"Search results for '{query}' (placeholder)"

async def embedding_lookup(text):
    return f"Embedding results for '{text}' (placeholder)"

async def read_pdf(file_path):
    return f"Read PDF from {file_path} (placeholder)"

def format_output(text):
    return f"Formatted Output:\n{text}"
