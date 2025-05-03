"use client";

import { useState } from "react";
import Button from "./UI/Button";

export default function ConnectionManager({ agents, connections, setConnections }) {
  const [fromAgent, setFromAgent] = useState("");
  const [toAgent, setToAgent] = useState("");

  const addConnection = () => {
    if (!fromAgent || !toAgent) return;
    setConnections(prev => [...prev, { from_agent: fromAgent, to_agent: toAgent }]);
    setFromAgent("");
    setToAgent("");
  };

  const removeConnection = (index) => {
    setConnections(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Connections</h2>
      <div className="flex flex-col gap-3">
        <select value={fromAgent} onChange={(e) => setFromAgent(e.target.value)} className="border rounded p-2">
          <option value="">From Agent</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>{agent.name}</option>
          ))}
        </select>
        <select value={toAgent} onChange={(e) => setToAgent(e.target.value)} className="border rounded p-2">
          <option value="">To Agent</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>{agent.name}</option>
          ))}
        </select>
        <Button onClick={addConnection}>Add Connection</Button>
      </div>
      <ul className="mt-4 space-y-2">
        {connections.map((conn, idx) => (
          <li key={idx} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            {conn.from_agent} ➡️ {conn.to_agent}
            <Button onClick={() => removeConnection(idx)} className="bg-red-500 hover:bg-red-600">Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
