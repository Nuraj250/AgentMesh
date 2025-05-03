from pydantic import BaseModel
from typing import List

class AgentConfig(BaseModel):
    id: str
    name: str
    role: str
    tools: List[str]
    icon: str = None
    position: dict = None

class Connection(BaseModel):
    from_agent: str
    to_agent: str

class WorkflowConfig(BaseModel):
    id: str
    user_id: str
    agents: List[AgentConfig]
    connections: List[Connection]
