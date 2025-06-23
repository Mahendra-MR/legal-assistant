# 🧠 Legal Assistant (LLM-based RAG App)

A modern, full-stack AI Legal Assistant built with FastAPI, LangChain, and Ollama backend, paired with a responsive Next.js frontend. The assistant leverages open-source LLMs (like Mistral via Ollama) to answer Indian law-related questions using PDF documents like IPC, Constitution, and Nyaya Sanhita.

---

## 🔧 Tech Stack

### 📌 Backend

* **FastAPI** - Modern Python web framework
* **LangChain** - RAG pipeline and document loader
* **Ollama** - Runs local open-source LLMs (like `mistral`)
* **ChromaDB** - Vector store for embeddings
* **HuggingFace** - For sentence transformers

### 💻 Frontend (Planned)

* **Next.js (App Router)**
* **Tailwind CSS**
* **TypeScript**
* **ChatGPT-like responsive chat UI**

---

## 🗂️ Project Structure

```
legal-assistant/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/ask.py
│   │   ├── chains/qa_chain.py
│   │   ├── embeddings/embed_index.py
│   │   ├── main.py
│   │   ├── models/schema.py
│   │   └── services/rag_service.py
│   ├── data/  # Contains legal PDFs
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/  # Will contain Next.js frontend (in progress)
├── .gitignore
└── README.md
```

---

## ⚙️ How to Run Backend

### 1. Clone the repo

```bash
git clone https://github.com/Mahendra-MR/legal-assistant.git
cd legal-assistant
```

### 2. Setup Python virtual environment

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run Ollama and pull model

```bash
ollama run mistral
```

Make sure Ollama is installed and `ollama` works from terminal.

### 4. Embed PDFs to Chroma vectorstore

```bash
python app/embeddings/embed_index.py
```

### 5. Run FastAPI server

```bash
uvicorn app.main:app --reload
```

API should now be available at: `http://localhost:8000/docs`

---

## ✅ API Usage Example

Use a tool like Postman or PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/v1/ask" `
  -Method Post `
  -Body '{"question": "What is Article 21 of the Constitution?"}' `
  -ContentType "application/json"
```

---

## 📄 Documents Used

* Bharatiya Nyaya Sanhita
* THE INDIAN PENAL CODE 1860
* Constitution Sample PDF

Add more PDFs inside `backend/data/` and re-run `embed_index.py` to update vectorstore.

---

## 🚧 Frontend Status

* Frontend will be built using Next.js with a ChatGPT-style UI.
* Will include features like chat history, theme toggle, mobile-friendly view.

👉 *Stay tuned for updates. Once frontend is ready, this README will be extended.*
