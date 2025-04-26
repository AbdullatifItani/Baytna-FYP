import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../store/config";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  // draggable state: x = distance from right, y = distance from bottom
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
  };

  const handleMouseDown = e => {
    setDragging(true);
    // record pointer position
    offsetRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = e => {
    if (!dragging) return;
    // compute delta
    const dx = e.clientX - offsetRef.current.x;
    const dy = e.clientY - offsetRef.current.y;
    setPosition(prev => ({
      x: Math.max(prev.x - dx, 0),
      y: Math.max(prev.y - dy, 0)
    }));
    offsetRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/chatbot/`,
        { message: input },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const data = response.data;
      const botMessage = data.properties
        ? { sender: "bot", text: data.message, properties: data.properties }
        : { sender: "bot", text: data.message };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const botMessage = { sender: "bot", text: "Sorry, something went wrong. Please try again." };
      setMessages(prev => [...prev, botMessage]);
    }
    setInput("");
  };

  return (
    <div
      className="chatbot"
      style={{
        right: position.x,
        bottom: position.y,
        left: "auto",
        top: "auto"
      }}
    >
      <div className="chatbot-header" onMouseDown={handleMouseDown}>
        <h3>PropertyPal</h3>
        <div>
          <button className="reset-button" onClick={resetChat}>
            Clear Chat
          </button>
          <button className="minimize-button" onClick={toggleMinimize}>
            {isMinimized ? "+" : "-"}
          </button>
        </div>
      </div>
      {!isMinimized && (
        <>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${msg.sender === "user" ? "user" : "bot"}`}
              >
                <p>{msg.text}</p>
                {msg.properties && (
                  <div className="property-list">
                    {msg.properties.map((prop, i) => (
                      <div key={i} className="property-item">
                        <p>Price: ${prop.price.toLocaleString()}</p>
                        <p>Location: {prop.city}</p>
                        <p>Street: {prop.street}</p>
                        <p>Type: {prop.type}</p>
                        <p>Bedrooms: {prop.bed}</p>
                        <p>Bathrooms: {prop.bath}</p>
                        <p>Square Feet: {prop.sqft}</p>
                        <p>Lot Size: {prop.lot} sqft</p>
                        <p>Built: {prop.built}</p>
                        <p>Garage: {prop.garage} cars</p>
                        <p>
                          Listing Date:{" "}
                          {new Date(prop.listing_date).toLocaleDateString()}
                        </p>
                        <p>Listing Agent: {prop.listing_agent}</p>
                        <p>Description: {prop.description}</p>
                        <p>Listing Id: {prop.listing_id}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;