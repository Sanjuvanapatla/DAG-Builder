import React from 'react';
import { FaProjectDiagram } from 'react-icons/fa';

const ValidationStatus = ({ dagStatus, showJSON, nodes, edges, theme }) => {
  const isDark = theme === 'dark';
  return (
    <div
      className="position-absolute bottom-0 end-0 m-3 p-3 border rounded shadow-sm"
      style={{
        maxWidth: 350,
        backgroundColor: isDark ? '#2c2c2c' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
      }}
    >
      <div className="mb-2 d-flex flex-row justify-content-between align-items-center gap-2">
        <strong>DAG Status:</strong>
        {dagStatus.valid ? '✅ Valid DAG' : `❌ Invalid: ${dagStatus.reason}`}
      </div>
      {showJSON && (
        <div>
          <strong>
            <FaProjectDiagram /> JSON Preview:
          </strong>
          <pre
            style={{
              maxHeight: 200,
              overflow: 'auto',
              fontSize: '0.75rem',
              backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
              color: isDark ? '#dcdcdc' : '#212529',
            }}
          >
            {JSON.stringify({ nodes, edges }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ValidationStatus;
