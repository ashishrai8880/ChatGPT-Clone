import React, { useState, useRef } from "react";

function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  // Scroll to bottom on new message
  const scrollToBottom = () => {
    setTimeout(() => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add user's message
    const userMessage = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    scrollToBottom();

    try {
      const API_ENDPOINT = process.env.REACT_APP_API_URL;
      const payload = { message: trimmed };
      // Show typing loader
      setIsLoading(true);
      const res = await fetch(`${API_ENDPOINT}/api/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // Add bot's response
      const botMessage = { sender: "bot", text: data.message };
      // const botMessage = { sender: "bot", text: "Just checking" };
      setMessages((prev) => [...prev, botMessage]);
      scrollToBottom();
      setIsLoading(false);
    } catch (err) {
      console.error("API error:", err);
      const errorMessage = {
        sender: "bot",
        text: "Oops! Something went wrong.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-neutral-900 text-white h-screen flex flex-col">
      {/* Chat container */}
      <div
        id="chat-container"
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl w-full mx-auto space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-neutral-400 animate-fade-in">
            <div className="text-6xl mb-4">💬</div>
            <h1 className="text-3xl font-bold text-white mb-2">Ask Anything</h1>
            <p className="max-w-md text-base">
              I'm here to help. Type your question below and hit send — whether
              it's about code, weather, or life!
            </p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-prose ${
                  msg.sender === "user" ? "bg-blue-600" : "bg-neutral-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-neutral-800 rounded-lg px-4 py-2 max-w-prose flex items-center gap-2">
              <span className="typing-dot animate-bounce delay-0">.</span>
              <span className="typing-dot animate-bounce delay-200">.</span>
              <span className="typing-dot animate-bounce delay-400">.</span>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="bg-neutral-900 px-4 py-3 w-full max-w-3xl mx-auto border-t border-neutral-700">
        <div className="flex items-end gap-2">
          <textarea
            className="flex-grow resize-none bg-neutral-800 text-white rounded-lg p-3 h-14 outline-none placeholder-neutral-400"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
