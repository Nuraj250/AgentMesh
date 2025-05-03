"use client";

import { useState } from "react";
import Button from "./UI/Button";

export default function WorkflowManager({ workflows, setWorkflows, selectedWorkflow, setSelectedWorkflow }) {
  const [name, setName] = useState("");

  const createWorkflow = () => {
    if (!name) return;
    const newWorkflow = { id: `workflow_${Date.now()}`, name };
    setWorkflows(prev => [...prev, newWorkflow]);
    setSelectedWorkflow(newWorkflow);
    setName("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Workflows</h2>

      <div className="flex flex-col gap-2 mb-4">
        <select
          value={selectedWorkflow?.id || ""}
          onChange={(e) => {
            const wf = workflows.find(w => w.id === e.target.value);
            if (wf) setSelectedWorkflow(wf);
          }}
          className="border rounded p-2"
        >
          <option value="">Select Workflow</option>
          {workflows.map(wf => (
            <option key={wf.id} value={wf.id}>{wf.name}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New Workflow Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 flex-1"
          />
          <Button onClick={createWorkflow}>Create</Button>
        </div>
      </div>
    </div>
  );
}
