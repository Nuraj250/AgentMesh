"use client";

import { useState, useEffect } from "react";
import AgentManager from "@/components/AgentManager";
import ConnectionManager from "@/components/ConnectionManager";
import GraphBuilder from "@/components/GraphBuilder";
import WorkflowRunner from "@/components/WorkflowRunner";
import WorkflowManager from "@/components/WorkflowManager";
import Button from "@/components/UI/Button";
import { saveWorkflow, loadWorkflow } from "@/lib/workflowApi";

export default function Home() {
  const [agents, setAgents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  const userId = "demo_user";

  useEffect(() => {
    async function fetchWorkflow() {
      if (!selectedWorkflow) return;
      try {
        const data = await loadWorkflow(selectedWorkflow.id);
        setAgents(data.agents || []);
        setConnections(data.connections || []);
      } catch (err) {
        console.log("No saved workflow yet");
      }
    }
    fetchWorkflow();
  }, [selectedWorkflow]);

  const handleSave = async () => {
    const fullAgents = [...agents, { id: "user", name: "User", role: "Start Node", tools: [], icon: "/agent-icon.png", position: { x: 50, y: 50 } }];
    const startingConnection = { from_agent: "user", to_agent: agents[0]?.id };
    const uniqueConnections = [
      startingConnection,
      ...connections.filter(c => !(c.from_agent === "user"))
    ];

    const payload = {
      id: selectedWorkflow?.id || "workflow_default",
      user_id: userId,
      agents: fullAgents,
      connections: uniqueConnections
    };

    try {
      await saveWorkflow(payload);
      alert("✅ Workflow saved!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save workflow.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="col-span-1 space-y-6">
        <WorkflowManager
          workflows={workflows}
          setWorkflows={setWorkflows}
          selectedWorkflow={selectedWorkflow}
          setSelectedWorkflow={setSelectedWorkflow}
        />
        <AgentManager agents={agents} setAgents={setAgents} />
        <ConnectionManager agents={agents} connections={connections} setConnections={setConnections} />
        <Button onClick={handleSave} className="w-full">Save Workflow</Button>
      </div>
      <div className="col-span-2">
        <GraphBuilder agents={agents} connections={connections} setConnections={setConnections} />
      </div>
      <div className="col-span-1">
        <WorkflowRunner workflowId={selectedWorkflow?.id || "workflow_default"} />
      </div>
    </div>
  );
}
