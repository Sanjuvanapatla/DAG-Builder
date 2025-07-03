# 🚀 DAG Builder / Pipeline Editor

A visual **Pipeline Editor** built using **React**, **React Flow**, and **Dagre**, allowing users to interactively create and validate **Directed Acyclic Graphs (DAGs)**. This tool mimics real-time data pipeline editors seen in ETL platforms and data orchestration tools.

## 🌐 Demo

🔗 [Live Demo on Vercel](https://your-vercel-deployment-link.vercel.app)

📽️ **Screen Recording & Screenshots**

- ![Demo Screenshot 1](screenshots/screenshot1.png)
- ![Demo Screenshot 2](screenshots/screenshot2.png)
- 🎥 [Demo Recording](https://link-to-demo-recording)

---

## 🛠 Features

- ➕ **Add Node**: Prompt-based creation of nodes.
- 🔗 **Draw Edges**: Interactive edge creation with validation.
- ❌ **Delete Nodes/Edges**: Use the `Delete` or `Backspace` key.
- ✅ **DAG Validation**: Real-time DAG validity status panel.
- 🧭 **Auto Layout**: Use **Dagre** to organize nodes cleanly.
- 🌓 **Dark/Light Theme Toggle**
- 🔄 **Undo/Redo Support**
- 🧾 **Live JSON Preview** of nodes and edges.

---

## 🚀 Setup Instructions

```bash
git clone https://github.com/your-username/dag-builder.git
cd dag-builder
npm install
npm start

📦 Libraries & Tools Used
Library	Purpose
react	Core React framework
reactflow	DAG rendering and graph management
dagre	Auto-layout engine
react-icons	For icons and action visuals
bootstrap	Styling buttons and layout (via CDN or npm)
zustand	(Optional) For future state management needs

🧠 Key Architectural Decisions
Component Splitting: The project separates major sections into:

FlowEditor.jsx: Main logic and flow container

ControlPanel.jsx: Handles UI buttons like add/delete/layout/theme

NodeComponent.jsx: Custom node view

ValidationStatus.jsx: DAG validation status + JSON viewer

Undo/Redo Stack: State snapshots are stored in two arrays undoStack and redoStack. Actions like adding/removing nodes push a copy into the stack.

Auto Layout: dagre computes layout positions, and fitView() ensures the graph fits the viewport.

📉 Challenges & Learnings
Challenge	Solution
Proper dagre layout integration	Learned to convert between React Flow and dagre graph formats
Preventing invalid edges	Implemented rules for preventing self-loops and incorrect edge directions
Undo/Redo not working correctly	Introduced deep state snapshots and integrated stack logic on every state update
Theme styling inside custom nodes	Dynamically passed theme info and styled based on props
Component state updates causing infinite loops	Carefully used dependency arrays and useCallback

📁 Folder Structure
css
Copy code
src/
│
├── components/
│   ├── ControlPanel.jsx
│   ├── NodeComponent.jsx
│   ├── ValidationStatus.jsx
│__ utils/
|    |-AutoLayoutUtils.jsx
├── FlowEditor.jsx
├── App.jsx
└── index.js

✨ Future Enhancements
Save/Load Graph as JSON

Drag-and-drop node creation

Multiple node types

Contextual right-click menu

Zoom-to-selection feature

📜 License
MIT License – Feel free to use and modify.

👨‍💻 Author
Vanapatla Sanja Kumar
 LinkedIn: https://www.linkedin.com/in/sanjay-kumar-vanapatla-35131022b/
