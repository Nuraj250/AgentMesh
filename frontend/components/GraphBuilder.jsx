"use client";

import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import nodeHtmlLabel from "cytoscape-node-html-label";
import edgehandles from "cytoscape-edgehandles";

cytoscape.use(nodeHtmlLabel);
cytoscape.use(edgehandles);

export default function GraphBuilder({ agents, connections, setConnections }) {
  const cyRef = useRef(null);

  useEffect(() => {
    if (!cyRef.current) return;

    const elements = [
      ...agents.map(agent => ({
        data: {
          id: agent.id,
          label: agent.name,
          icon: agent.icon,
          role: agent.role,
        },
        position: agent.position || { x: Math.random() * 500, y: Math.random() * 300 }
      })),
      ...connections.map(conn => ({
        data: { source: conn.from_agent, target: conn.to_agent }
      }))
    ];

    const cy = cytoscape({
      container: cyRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'shape': 'ellipse',
            'background-color': ele => {
              const role = ele.data('role')?.toLowerCase() || "";
              if (role.includes("summarizer")) return '#3b82f6';
              if (role.includes("critic")) return '#ef4444';
              if (role.includes("reporter")) return '#22c55e';
              return '#6b7280';
            },
            'width': '80px',
            'height': '80px',
            'label': 'data(label)',
            'text-valign': 'bottom',
            'text-halign': 'center',
            'font-size': '10px',
            'color': '#374151',
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#cbd5e1',
            'target-arrow-color': '#cbd5e1',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          }
        }
      ],
      layout: { name: 'preset' },
    });

    // Handle icons
    nodeHtmlLabel(cy, [{
      query: 'node',
      halign: 'center',
      valign: 'center',
      halignBox: 'center',
      valignBox: 'center',
      tpl: function(data) {
        return `<div style="width:50px;height:50px;border-radius:50%;background-image:url('${data.icon}');background-size:cover;background-position:center;"></div>`;
      }
    }]);

    // Enable edgehandles for drag-to-connect
    const eh = cy.edgehandles({
      snap: true,
      noEdgeEventsInDraw: true,
      disableBrowserGestures: true,
      edgeType: function (sourceNode, targetNode) {
        if (sourceNode.id() === targetNode.id()) return null;
        return 'flat';
      }
    });

    // On new connection complete
    cy.on('ehcomplete', (event, sourceNode, targetNode) => {
      setConnections(prev => [...prev, { from_agent: sourceNode.id(), to_agent: targetNode.id() }]);
    });

    // On edge click - delete
    cy.on('tap', 'edge', (evt) => {
      const edge = evt.target;
      const source = edge.data('source');
      const target = edge.data('target');

      const confirmed = window.confirm(`Delete connection from ${source} ➡️ ${target}?`);
      if (confirmed) {
        setConnections(prev => prev.filter(conn => !(conn.from_agent === source && conn.to_agent === target)));
        edge.remove();
      }
    });

    return () => cy.destroy();
  }, [agents, connections]);

  return <div ref={cyRef} className="w-full h-96 bg-gray-100 rounded-md" />;
}
