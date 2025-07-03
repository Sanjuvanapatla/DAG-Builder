import React from 'react';
import { Handle, Position } from 'reactflow';

const NodeComponent = ({ data, theme }) => {
  const isDark = theme === 'dark';
  return (
    <div
      className={`p-2 border rounded text-center shadow-sm`}
      style={{
        backgroundColor: isDark ? '#2c2c2c' : '#ffffff',
        borderColor: isDark ? '#66b2ff' : '#007bff',
        color: isDark ? '#ffffff' : '#000000',
      }}
    >
      <Handle type="target" position={Position.Left} />
      <strong>{data.label}</strong>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default NodeComponent;
