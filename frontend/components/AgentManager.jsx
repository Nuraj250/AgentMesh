"use client";

import { useState } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";

export default function AgentManager({ agents, setAgents }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [tools, setTools] = useState("");
  const [icon, setIcon] = useState("/agent-icon.png");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIcon(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAgent = () => {
    const id = `agent_${Date.now()}`;
    setAgents(prev => [...prev, { id, name, role, tools: tools.split(','), icon }]);
    setIsOpen(false);
    setName(""); setRole(""); setTools(""); setIcon("/agent-icon.png");
  };

  const removeAgent = (id) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Agents</h2>
        <Button onClick={() => setIsOpen(true)}>Add Agent</Button>
      </div>
      <ul className="space-y-2">
        {agents.map(agent => (
          <li key={agent.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <div>
              <p className="font-semibold">{agent.name}</p>
              <p className="text-xs text-gray-500">{agent.role}</p>
            </div>
            <Button onClick={() => removeAgent(agent.id)} className="bg-red-500 hover:bg-red-600">Delete</Button>
          </li>
        ))}
      </ul>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Add New Agent">
        <div className="flex flex-col gap-3">
          <input type="text" placeholder="Agent Name" value={name} onChange={e => setName(e.target.value)} className="border rounded p-2" />
          <input type="text" placeholder="Agent Role" value={role} onChange={e => setRole(e.target.value)} className="border rounded p-2" />
          <input type="text" placeholder="Tools (comma separated)" value={tools} onChange={e => setTools(e.target.value)} className="border rounded p-2" />
          <input type="file" accept="image/*" onChange={handleFileChange} className="border rounded p-2" />
          {icon && <img src={icon} alt="Preview" className="h-16 w-16 rounded-full mt-2 object-cover" />}
          <Button onClick={addAgent}>Save Agent</Button>
        </div>
      </Modal>
    </div>
  );
}
