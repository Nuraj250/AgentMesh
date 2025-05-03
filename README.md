# 🧠 AgentMesh

**AgentMesh** is a dynamic multi-agent orchestration platform that allows users to create, connect, and run AI agents visually — like building AI workflows as graphs!

Built with:
- 🖥️ Frontend: Next.js, TailwindCSS, Cytoscape.js, Socket.IO
- ⚙️ Backend: FastAPI, Python, OpenAI, MongoDB
- 🔌 Real-time Communication: Socket.IO

---

## ✨ Features

- 🔹 Add/Edit/Delete AI Agents dynamically
- 🔹 Upload agent logos/icons
- 🔹 Define agent roles and tools
- 🔹 Drag and connect agents (graph UI)
- 🔹 Color-coded nodes based on agent role
- 🔹 Delete connections by clicking
- 🔹 Create and manage multiple workflows
- 🔹 Save and load workflows (agents + connections + positions)
- 🔹 Run workflows live via OpenAI API
- 🔹 Realtime logs during workflow execution
- 🔹 Drag node positions and save layout
- 🔹 Modular clean UI components
- 🔹 Full real-time graph updates with Socket.IO

---

## 🚀 Tech Stack

| Layer      | Technology |
|:-----------|:------------|
| Frontend   | Next.js, TailwindCSS, Cytoscape.js, Socket.IO-Client |
| Backend    | FastAPI, Python, OpenAI, MongoDB |
| Realtime   | Socket.IO (FastAPI-ASGI) |
| Database   | MongoDB Atlas / Local |
| Authentication (Optional) | NextAuth.js (future) |

---

## 📦 Project Structure

```

backend/
├── main.py
├── database.py
├── models.py
├── agent\_runner.py
├── socket\_events.py
├── utils.py
├── seed.py
├── reset.py
├── requirements.txt
├── .env

frontend/
├── components/
│   ├── AgentManager.jsx
│   ├── ConnectionManager.jsx
│   ├── GraphBuilder.jsx
│   ├── WorkflowRunner.jsx
│   ├── WorkflowManager.jsx
│   └── UI/
│       ├── Button.jsx
│       └── Modal.jsx
├── lib/
│   ├── socket.js
│   └── workflowApi.js
├── pages/
│   └── index.js
├── styles/
│   └── globals.css
├── public/
│   └── agent-icon.png
├── package.json
├── tailwind.config.js
└── README.md

````

---

## 🛠️ Setup Instructions

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:socket_app --reload --port 8000
````

* Create `.env` file:

  ```
  MONGO_URI=mongodb://localhost:27017
  OPENAI_API_KEY=sk-xxxxxxx
  ```

* Seed sample workflow:

  ```bash
  python seed.py
  ```

---

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:3000`
Backend runs at: `http://localhost:8000`

---

## 📸 Screenshots

| Agents & Connections                                           | Live Execution Logs                                             |
| :------------------------------------------------------------- | :-------------------------------------------------------------- |
| ![graph](https://via.placeholder.com/300x200?text=Agent+Graph) | ![logs](https://via.placeholder.com/300x200?text=Workflow+Logs) |

---

## 🛣️ Roadmap

* [ ] Realtime collaboration (multi-user graph editing)
* [ ] Add agent marketplace templates
* [ ] Authentication with NextAuth.js
* [ ] Workflow versioning & history
* [ ] Public deployment (Railway + Vercel)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue, create a pull request, or suggest a feature.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💬 Contact

Made with ❤️ by \[Nuraj250]

* GitHub: [@Nuraj250](https://github.com/Nuraj250)