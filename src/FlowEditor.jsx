import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import NodeComponent from './components/NodeComponents.jsx';
import ControlPanel from './components/ControlPanel';
import ValidationStatus from './components/ValidationStatus';
import { getLayoutedElements } from './utils/AutoLayoutUtils';

const nodeTypes = { custom: NodeComponent };

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dagStatus, setDagStatus] = useState({ valid: false, reason: '' });
  const [showJSON, setShowJSON] = useState(true);
  const [theme, setTheme] = useState('light');

  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const { fitView } = useReactFlow();

  // Node Add
  const addNode = useCallback(() => {
    const label = prompt('Enter node label:');
    if (!label) return;
    const id = Date.now().toString();
    const newNode = {
      id,
      type: 'custom',
      data: { label, theme },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
    };
    updateGraph([...nodes, newNode], edges);
    setTimeout(() => fitView(), 100);
  }, [nodes, edges, setNodes]);

  // Connection
  const onConnect = useCallback(
    (params) => {
      if (params.source === params.target) return;
      updateGraph(nodes, addEdge({ ...params, animated: true }, edges));
    },
    [nodes, edges]
  );

  // Auto Layout
  const onAutoLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    updateGraph(layoutedNodes, layoutedEdges);
    setTimeout(() => fitView(), 100);
  }, [nodes, edges]);

  // Undo/Redo Logic
  const updateGraph = (newNodes, newEdges) => {
    setHistory((prev) => [...prev, { nodes, edges }]);
    setFuture([]);
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((prevHist) => prevHist.slice(0, -1));
    setFuture((fut) => [{ nodes, edges }, ...fut]);
    setNodes(prev.nodes);
    setEdges(prev.edges);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((fut) => fut.slice(1));
    setHistory((prev) => [...prev, { nodes, edges }]);
    setNodes(next.nodes);
    setEdges(next.edges);
  };

  // Keyboard Delete
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const newNodes = nodes.filter((n) => !n.selected);
        const newEdges = edges.filter((e) => !e.selected);
        updateGraph(newNodes, newEdges);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges]);

  // DAG Status
  useEffect(() => {
    if (nodes.length < 2) {
      setDagStatus({ valid: false, reason: 'Less than 2 nodes' });
    } else {
      setDagStatus({ valid: true });
    }
  }, [nodes, edges]);

  const toggleJSON = () => setShowJSON((prev) => !prev);
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const appStyles = {
    backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
    color: theme === 'light' ? '#000' : '#fff',
  };

  const themedNodes = nodes.map((n) => ({
    ...n,
    data: { ...n.data, theme },
  }));

  return (
    <ReactFlowProvider>
      <div
        className="container-fluid p-0"
        style={{ width: '100vw', height: '100vh', position: 'relative', ...appStyles }}
      >
        <ControlPanel
          addNode={addNode}
          onAutoLayout={onAutoLayout}
          toggleJSON={toggleJSON}
          toggleTheme={toggleTheme}
          undo={undo}
          redo={redo}
          theme={theme}
        />

        <ReactFlow
          nodes={themedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>

        <ValidationStatus
          dagStatus={dagStatus}
          showJSON={showJSON}
          nodes={nodes}
          edges={edges}
          theme={theme}
        />
      </div>
    </ReactFlowProvider>
  );
};

export default FlowEditor;
