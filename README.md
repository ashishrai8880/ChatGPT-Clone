# 🧠 ChatGPT Clone

A full-stack ChatGPT clone built using **Node.js** and **React.js**, integrated with **GROQ Cloud's LLaMA model** for AI responses and **Tavily API** for real-time web search capabilities.

---

## 🚀 Features

- 🤖 Conversational AI powered by LLaMA (via GROQ Cloud)
- 🔍 Real-time search context via Tavily API
- 🌐 Full-stack app using Node.js (backend) & React.js (frontend)
- 📦 Easy to run with `npm run start` for both backend and frontend
- 💬 Chat interface with streaming or instant responses (based on model)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Fetch (for API requests)
- CSS / Tailwind / Bootstrap (customize if needed)

### Backend
- Node.js
- Express.js
- GROQ API (LLaMA models)
- Tavily Search API
- dotenv for environment variable management

---

## 📁 Project Structure
chatgpt-clone/
├── backend/
│ ├── index.js
│ ├── routes/
│ ├── services/
│ └── .env
├── frontend/
│ ├── src/
│ ├── public/
│ └── .env
└── README.md


---

## 🔑 Environment Variables

Create a `.env` file in both the backend and frontend folders.

### Backend `.env`

GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
PORT=5000

### Frontend `.env`

(Optional: if you're using environment variables in frontend)


---

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/chatgpt-clone.git
cd chatgpt-clone
```

### 1. Install Dependencies
  1. Backend

```bash
cd backend
npm install
```

1. Frontend

```bash
cd ../frontend
npm install
```

### 1.Run the Applications
  1. Start Backend

```bash
npm run start
```

2. Start Frontend

```bash
npm run start
```

📦 API Integration

GROQ Cloud (LLaMA Model): Used for generating AI-based responses.

Tavily API: Provides real-time web search results to enrich chat context.

🧪 Future Improvements (Suggestions)

Add user authentication

Support for multiple LLM providers

UI/UX enhancements

Save chat history (localStorage or DB)

Deploy to Vercel/Render/Netlify

🙌 Acknowledgements

GROQ Cloud

Tavily API

OpenAI Chat UI Inspiration
