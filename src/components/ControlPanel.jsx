// ControlPanel.jsx
import React from 'react';
import { FaPlus, FaStream, FaCode, FaMoon, FaSun, FaUndo, FaRedo } from 'react-icons/fa';

const ControlPanel = ({
  addNode,
  onAutoLayout,
  toggleJSON,
  toggleTheme,
  theme,
  undo,
  redo,
}) => {
  return (
    <div className="position-absolute top-0 start-0 p-3 z-3 d-flex gap-2 flex-wrap">
      <button className="btn btn-primary" onClick={addNode} title="Add Node">
        <FaPlus /> Add Node
      </button>
      <button className="btn btn-warning" onClick={onAutoLayout} title="Auto Layout">
        <FaStream /> Auto Layout
      </button>
      <button className="btn btn-secondary" onClick={toggleJSON} title="Toggle JSON">
        <FaCode /> JSON
      </button>
      <button className="btn btn-dark" onClick={toggleTheme} title="Toggle Theme">
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
      <button className="btn btn-outline-secondary" onClick={undo} title="Undo">
        <FaUndo /> Undo
      </button>
      <button className="btn btn-outline-secondary" onClick={redo} title="Redo">
        <FaRedo /> Redo
      </button>
    </div>
  );
};

export default ControlPanel;
