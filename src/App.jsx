import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  addEdge,
  MarkerType,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';

const proOptions = { hideAttribution: true };

// Custom Node Types with Handles on all sides
const CustomNode = ({ data, isConnectable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(data.label);
  const [editDescription, setEditDescription] = useState(data.description || '');

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    data.label = editLabel;
    data.description = editDescription;
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditLabel(data.label);
      setEditDescription(data.description || '');
      setIsEditing(false);
    }
  };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 min-w-[120px]">
      {/* All four sides with multiple handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        isConnectable={isConnectable}
        style={{ background: '#555', left: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        isConnectable={isConnectable}
        style={{ background: '#555', left: '75%' }}
      />
      
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        isConnectable={isConnectable}
        style={{ background: '#555', left: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        isConnectable={isConnectable}
        style={{ background: '#555', left: '75%' }}
      />
      
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        isConnectable={isConnectable}
        style={{ background: '#555', top: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        isConnectable={isConnectable}
        style={{ background: '#555', top: '75%' }}
      />
      
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        isConnectable={isConnectable}
        style={{ background: '#555', top: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        isConnectable={isConnectable}
        style={{ background: '#555', top: '75%' }}
      />

      <div className="flex">
        <div className="ml-2">
          {isEditing ? (
            <div className="space-y-1">
              <input
                type="text"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleSave}
                className="text-lg font-bold bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 w-full"
                autoFocus
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleSave}
                className="text-gray-500 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                placeholder="Description (optional)"
              />
            </div>
          ) : (
            <div onDoubleClick={handleDoubleClick} className="cursor-pointer">
              <div className="text-lg font-bold">{data.label}</div>
              {data.description && (
                <div className="text-gray-500 text-sm">{data.description}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DecisionNode = ({ data, isConnectable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(data.label);

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    data.label = editLabel;
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditLabel(data.label);
      setIsEditing(false);
    }
  };

  return (
    <div className="px-4 py-2 shadow-md bg-yellow-100 border-2 border-yellow-400 rounded-lg transform rotate-45 relative min-w-[80px] min-h-[80px] flex items-center justify-center">
      {/* All four sides for diamond */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        isConnectable={isConnectable}
        style={{ background: '#555', transform: 'rotate(-45deg)', left: '40%' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        isConnectable={isConnectable}
        style={{ background: '#555', transform: 'rotate(-45deg)', left: '60%' }}
      />
      
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        isConnectable={isConnectable}
        style={{ background: '#555', transform: 'rotate(-45deg)', left: '40%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        isConnectable={isConnectable}
        style={{ background: '#555', transform: 'rotate(-45deg)', left: '60%' }}
      />
      
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        isConnectable={isConnectable}
        style={{ background: '#555', transform: 'rotate(-45deg)', top: '40%' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        isConnectable={isConnectable}
        style={{ background: '#555', transform: 'rotate(-45deg)', top: '60%' }}
      />
      
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        isConnectable={isConnectable}
        style={{ background: '#555', transform: 'rotate(-45deg)', top: '40%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        isConnectable={isConnectable}
        style={{ background: '#555', transform: 'rotate(-45deg)', top: '60%' }}
      />

      <div className="transform -rotate-45">
        {isEditing ? (
          <input
            type="text"
            value={editLabel}
            onChange={(e) => setEditLabel(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSave}
            className="text-sm font-bold text-center bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 w-full"
            autoFocus
          />
        ) : (
          <div 
            className="text-sm font-bold text-center cursor-pointer" 
            onDoubleClick={handleDoubleClick}
          >
            {data.label}
          </div>
        )}
      </div>
    </div>
  );
};

const ProcessNode = ({ data, isConnectable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(data.label);
  const [editDescription, setEditDescription] = useState(data.description || '');

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    data.label = editLabel;
    data.description = editDescription;
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditLabel(data.label);
      setEditDescription(data.description || '');
      setIsEditing(false);
    }
  };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-blue-100 border-2 border-blue-400 min-w-[120px]">
      {/* All four sides with multiple handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        isConnectable={isConnectable}
        style={{ background: '#555', left: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        isConnectable={isConnectable}
        style={{ background: '#555', left: '75%' }}
      />
      
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        isConnectable={isConnectable}
        style={{ background: '#555', left: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        isConnectable={isConnectable}
        style={{ background: '#555', left: '75%' }}
      />
      
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        isConnectable={isConnectable}
        style={{ background: '#555', top: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        isConnectable={isConnectable}
        style={{ background: '#555', top: '75%' }}
      />
      
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        isConnectable={isConnectable}
        style={{ background: '#555', top: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        isConnectable={isConnectable}
        style={{ background: '#555', top: '75%' }}
      />

      {isEditing ? (
        <div className="space-y-1">
          <input
            type="text"
            value={editLabel}
            onChange={(e) => setEditLabel(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSave}
            className="text-sm font-bold bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 w-full"
            autoFocus
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSave}
            className="text-gray-600 text-xs bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
            placeholder="Description (optional)"
          />
        </div>
      ) : (
        <div onDoubleClick={handleDoubleClick} className="cursor-pointer">
          <div className="text-sm font-bold">{data.label}</div>
          {data.description && (
            <div className="text-gray-600 text-xs">{data.description}</div>
          )}
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  default: CustomNode,
  decision: DecisionNode,
  process: ProcessNode,
};

// JSON Parser Utility
const parseJsonToDiagram = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    
    // Auto-layout: Simple grid positioning
    const nodes = data.nodes.map((node, index) => ({
      id: node.id,
      type: node.type || 'default',
      position: { 
        x: (index % 3) * 250 + 100, 
        y: Math.floor(index / 3) * 150 + 100 
      },
      data: {
        label: node.label,
        description: node.data?.description,
        ...node.data
      },
    }));

    const edges = data.edges?.map(edge => {
      const edgeStyle = {
        strokeWidth: edge.strokeWidth || 2,
        stroke: edge.color || '#b1b1b7',
      };

      if (edge.dashed) {
        edgeStyle.strokeDasharray = '5,5';
      }

      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle || null,
        targetHandle: edge.targetHandle || null,
        label: edge.label || '',
        type: 'default',
        animated: edge.animated || false,
        style: edgeStyle,
        labelStyle: {
          fontSize: 12,
          fontWeight: 500,
          fill: '#374151',
        },
        labelBgStyle: {
          fill: '#ffffff',
          fillOpacity: 0.8,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edge.color || '#b1b1b7',
        },
      };
    }) || [];

    return { nodes, edges, isValid: true };
  } catch (error) {
    return { nodes: [], edges: [], isValid: false, error: error.message };
  }
};

// Sample JSON data
const sampleJson = `{
  "nodes": [
    {
      "id": "start",
      "type": "process",
      "label": "Start Process",
      "data": {
        "description": "Initialize the workflow"
      }
    },
    {
      "id": "auth",
      "type": "default",
      "label": "User Authentication",
      "data": {
        "description": "Verify user credentials"
      }
    },
    {
      "id": "decision1",
      "type": "decision",
      "label": "Valid?",
      "data": {}
    },
    {
      "id": "success",
      "type": "process",
      "label": "Grant Access",
      "data": {
        "description": "User authenticated successfully"
      }
    },
    {
      "id": "failure",
      "type": "process",
      "label": "Deny Access",
      "data": {
        "description": "Authentication failed"
      }
    }
  ],
  "edges": [
    {
      "id": "e1",
      "source": "start",
      "target": "auth",
      "sourceHandle": "bottom-source",
      "targetHandle": "top-target",
      "label": "begin",
      "color": "#3b82f6",
      "strokeWidth": 2
    },
    {
      "id": "e2",
      "source": "auth",
      "target": "decision1",
      "sourceHandle": "right-source",
      "targetHandle": "left-target",
      "label": "check credentials",
      "color": "#6366f1",
      "strokeWidth": 2
    },
    {
      "id": "e3",
      "source": "decision1",
      "target": "success",
      "sourceHandle": "right-source",
      "targetHandle": "left-target",
      "label": "valid",
      "color": "#10b981",
      "strokeWidth": 3
    },
    {
      "id": "e4",
      "source": "decision1",
      "target": "failure",
      "sourceHandle": "bottom-source",
      "targetHandle": "top-target",
      "label": "invalid",
      "color": "#ef4444",
      "strokeWidth": 3,
      "dashed": true
    }
  ]
}`;

// Main App Component
function App() {
  const [jsonInput, setJsonInput] = useState(sampleJson);
  const [parseError, setParseError] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isManualMode, setIsManualMode] = useState(false);

  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      id: `edge-${params.source}-${params.target}-${Date.now()}`,
      type: 'default',
      animated: false,
      style: {
        strokeWidth: 2,
        stroke: '#374151',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#374151',
      },
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  // Handle canvas click events for adding/deleting nodes
  const onPaneClick = useCallback((event) => {
    if (event.ctrlKey || event.metaKey) {
      // Ctrl+Click to add new node
      const newId = `node-${Date.now()}`;
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 50,
      };
      
      const newNode = {
        id: newId,
        type: 'default',
        position,
        data: { 
          label: `New Node ${nodes.length + 1}`,
          description: 'Click to edit'
        },
      };
      setNodes((nds) => [...nds, newNode]);
    }
  }, [nodes.length, setNodes]);

  // Handle node click events for deletion
  const onNodeClick = useCallback((event, node) => {
    if (event.shiftKey) {
      // Shift+Click to delete node
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) => eds.filter((e) => e.source !== node.id && e.target !== node.id));
    }
  }, [setNodes, setEdges]);

  // Handle edge click events for deletion
  const onEdgeClick = useCallback((event, edge) => {
    if (event.shiftKey) {
      // Shift+Click to delete edge
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
  }, [setEdges]);

  const handleJsonChange = (value) => {
    setJsonInput(value);
    if (!isManualMode) {
      const result = parseJsonToDiagram(value);
      
      if (result.isValid) {
        setNodes(result.nodes);
        setEdges(result.edges);
        setParseError(null);
      } else {
        setParseError(result.error);
      }
    }
  };

  const toggleManualMode = () => {
    const newManualMode = !isManualMode;
    setIsManualMode(newManualMode);
    
    if (!newManualMode) {
      // Switching back to JSON mode - reload from JSON
      handleJsonChange(jsonInput);
    }
  };

  const addNewNode = () => {
    const newId = `node-${Date.now()}`;
    const newNode = {
      id: newId,
      type: 'default',
      position: { 
        x: Math.random() * 200 + 200, 
        y: Math.random() * 200 + 200 
      },
      data: { 
        label: `New Node ${nodes.length + 1}`,
        description: 'Click to edit'
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addDecisionNode = () => {
    const newId = `decision-${Date.now()}`;
    const newNode = {
      id: newId,
      type: 'decision',
      position: { 
        x: Math.random() * 200 + 300, 
        y: Math.random() * 200 + 300 
      },
      data: { 
        label: 'Decision?'
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addProcessNode = () => {
    const newId = `process-${Date.now()}`;
    const newNode = {
      id: newId,
      type: 'process',
      position: { 
        x: Math.random() * 200 + 400, 
        y: Math.random() * 200 + 400 
      },
      data: { 
        label: 'Process',
        description: 'New process step'
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const clearDiagram = () => {
    setNodes([]);
    setEdges([]);
  };

  // Initialize with sample data
  React.useEffect(() => {
    handleJsonChange(sampleJson);
  }, []);

  const generateSampleDiagram = () => {
    const newDiagram = `{
  "nodes": [
    {
      "id": "input",
      "type": "process",
      "label": "User Input",
      "data": {
        "description": "Collect user data"
      }
    },
    {
      "id": "validate",
      "type": "decision",
      "label": "Valid Data?",
      "data": {}
    },
    {
      "id": "process",
      "type": "default",
      "label": "Process Request",
      "data": {
        "description": "Handle the request"
      }
    },
    {
      "id": "error",
      "type": "process",
      "label": "Show Error",
      "data": {
        "description": "Display validation error"
      }
    },
    {
      "id": "success",
      "type": "process",
      "label": "Success Response",
      "data": {
        "description": "Return successful result"
      }
    }
  ],
  "edges": [
    {
      "id": "e1",
      "source": "input",
      "target": "validate",
      "sourceHandle": "right-source",
      "targetHandle": "left-target",
      "label": "submit",
      "color": "#8b5cf6",
      "strokeWidth": 2
    },
    {
      "id": "e2",
      "source": "validate",
      "target": "process",
      "sourceHandle": "top-source",
      "targetHandle": "bottom-target",
      "label": "valid",
      "color": "#10b981",
      "strokeWidth": 3
    },
    {
      "id": "e3",
      "source": "validate",
      "target": "error",
      "sourceHandle": "bottom-source",
      "targetHandle": "top-target",
      "label": "invalid",
      "color": "#ef4444",
      "strokeWidth": 2,
      "dashed": true
    },
    {
      "id": "e4",
      "source": "process",
      "target": "success",
      "sourceHandle": "right-source",
      "targetHandle": "left-target",
      "label": "complete",
      "color": "#06b6d4",
      "strokeWidth": 2,
      "animated": true
    }
  ]
}`;
    setJsonInput(newDiagram);
    if (!isManualMode) {
      handleJsonChange(newDiagram);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      {/* Left Panel - JSON Editor */}
      <div class="w-1/3 bg-gray-50 border-r border-gray-300 flex flex-col p-[6px]">
        <div className=" border-b border-gray-300 bg-white">
          <h2 className="text-lg font-bold text-gray-800">FlowGram</h2>
          <p className="text-sm muted">The code-to-diagram tool with reorganiseable nodes. No more autogenerated layouts that dont fit in docs!</p>
          
          {/* Mode Toggle */}
          <div className="flex gap-2 mt-2 mb-3 flex-wrap">
            <button
              onClick={toggleManualMode}
              className={`px-3 py-1 text-sm rounded ${
                isManualMode 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              {isManualMode ? 'Manual Mode ✓' : 'Enable Manual Mode'}
            </button>
            
            {isManualMode && (
              <>
                <button
                  onClick={addNewNode}
                  className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                >
                  + Node
                </button>
                <button
                  onClick={addProcessNode}
                  className="px-2 py-1 bg-cyan-500 text-white text-xs rounded hover:bg-cyan-600"
                >
                  + Process
                </button>
                <button
                  onClick={addDecisionNode}
                  className="px-2 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
                >
                  + Decision
                </button>
                <button
                  onClick={clearDiagram}
                  className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  Clear
                </button>
              </>
            )}
            
            {!isManualMode && (
              <button
                onClick={generateSampleDiagram}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Generate Sample
              </button>
            )}
          </div>

          {/* Manual Mode Instructions */}
          {isManualMode && (
            <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
              <strong>Manual Mode Controls:</strong>
              <ul className="mt-1 text-xs space-y-1">
                <li>• <strong>Ctrl+Click</strong> canvas to add new node</li>
                <li>• <strong>Shift+Click</strong> node/edge to delete it</li>
                <li>• Drag from connection points to create edges</li>
                <li>• Multiple connection points on each side</li>
              </ul>
            </div>
          )}
          
          {/* Edge Configuration Help */}
          {!isManualMode && (
            <div className="mt-3 text-xs text-gray-600">
              <details className="cursor-pointer">
                <summary className="font-semibold">Edge Options</summary>
                <div className="mt-1 space-y-1">
                  <div><code>color</code>: "#3b82f6" (hex color)</div>
                  <div><code>strokeWidth</code>: 1-5 (line thickness)</div>
                  <div><code>dashed</code>: true/false</div>
                  <div><code>animated</code>: true/false</div>
                  <div><code>sourceHandle</code>: "top-source", "bottom-source", etc.</div>
                  <div><code>targetHandle</code>: "top-target", "bottom-target", etc.</div>
                </div>
              </details>
            </div>
          )}
        </div>
        
        {!isManualMode && (
          <div className="flex-1 p-4">
            <textarea
              value={jsonInput}
              onChange={(e) => handleJsonChange(e.target.value)}
              className="w-full h-full font-mono text-sm border border-gray-300 rounded p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your diagram JSON here..."
            />
            
            {parseError && (
              <div className="mt-2 p-2 bg-red-100 border border-red-400 rounded text-red-700 text-sm">
                <strong>JSON Error:</strong> {parseError}
              </div>
            )}
          </div>
        )}

        {isManualMode && (
          <div className="flex-1 p-4">
            <div className="text-sm text-gray-600 space-y-2">
              <h3 className="font-semibold">Current Diagram:</h3>
              <div><strong>Nodes:</strong> {nodes.length}</div>
              <div><strong>Edges:</strong> {edges.length}</div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Instructions:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>Double-click</strong> node text to edit labels and descriptions</li>
                  <li>• <strong>Enter</strong> to save, <strong>Escape</strong> to cancel editing</li>
                  <li>• <strong>Ctrl+Click</strong> empty canvas area to add a new node</li>
                  <li>• <strong>Shift+Click</strong> any node or edge to delete it</li>
                  <li>• Each node has multiple connection points on all 4 sides</li>
                  <li>• Click and drag from any connection point to another to create edges</li>
                  <li>• Drag nodes to reposition them</li>
                  <li>• Use different node types with the buttons above</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - React Flow Canvas */}
      <div className="flex-1 ">
        <div className="w-full h-full">
          <ReactFlow
            proOptions={proOptions}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onPaneClick={onPaneClick}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-100"
            nodesDraggable={true}
            nodesConnectable={true}
            elementsSelectable={true}
            snapToGrid={true}
            snapGrid={[15, 15]}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default App;