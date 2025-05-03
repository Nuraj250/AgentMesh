"use client";

import socket from "../lib/socket";
import { useState } from "react";
import Button from "./UI/Button";

export default function WorkflowRunner({ workflowId }) {
  const [logs, setLogs] = useState([]);

  const startWorkflow = () => {
    socket.emit('start_workflow', { workflow_id: workflowId, input: "Start input" });
  };

  socket.on('agent_started', (data) => {
    setLogs(prev => [...prev, `🚀 Agent ${data.agent_id} started.`]);
  });

  socket.on('agent_completed', (data) => {
    setLogs(prev => [...prev, `✅ Agent ${data.agent_id} completed. Output: ${data.output}`]);
  });

  socket.on('workflow_completed', (data) => {
    setLogs(prev => [...prev, `🎉 Workflow completed: ${data.message}`]);
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Runner Logs</h2>
      <Button onClick={startWorkflow} className="mb-4">Start Workflow</Button>
      <div className="overflow-y-auto flex-1 text-sm">
        {logs.map((log, idx) => (
          <div key={idx} className="mb-1">{log}</div>
        ))}
      </div>
    </div>
  );
}
