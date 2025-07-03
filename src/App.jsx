// App.jsx
import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import FlowEditor from './FlowEditor';

const App = () => (
  <ReactFlowProvider>
    <FlowEditor />
  </ReactFlowProvider>
);

export default App;
