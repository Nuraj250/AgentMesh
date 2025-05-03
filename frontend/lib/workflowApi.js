export async function saveWorkflow(workflow) {
  const res = await fetch("/api/workflows", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workflow),
  });
  if (!res.ok) throw new Error("Failed to save workflow");
  return await res.json();
}

export async function loadWorkflow(workflowId) {
  const res = await fetch(`/api/workflows/${workflowId}`);
  if (!res.ok) throw new Error("Failed to load workflow");
  return await res.json();
}
