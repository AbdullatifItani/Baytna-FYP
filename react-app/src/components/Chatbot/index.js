import React, { useState } from "react";
import { BASE_URL } from "../../store/config";
import axios from "axios"; // Import axios

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleMinimize = () => {
        setIsMinimized((prev) => !prev);
    };

    const resetChat = () => {
        setMessages([]);
        setInput("");
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await axios.post(
                `${BASE_URL}/api/chatbot/`, // Use BASE_URL for consistency
                { message: input },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true, // Include credentials if needed
                }
            );

            const data = response.data;

            if (data.properties) {
                const botMessage = {
                    sender: "bot",
                    text: data.message,
                    properties: data.properties,
                };
                setMessages((prev) => [...prev, botMessage]);
            } else {
                const botMessage = { sender: "bot", text: data.message };
                setMessages((prev) => [...prev, botMessage]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            const botMessage = { sender: "bot", text: "Sorry, something went wrong. Please try again." };
            setMessages((prev) => [...prev, botMessage]);
        }

        setInput("");
    };

    return (
        <div className="chatbot">
            <div className="chatbot-header">
                <h3>PropertyBotPal</h3>
                <button className="reset-button" onClick={resetChat}>
                    Clear Chat
                </button>
                <button className="minimize-button" onClick={toggleMinimize}>
                    {isMinimized ? "+" : "-"}
                </button>
            </div>
            {!isMinimized && (
                <>
                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chatbot-message ${msg.sender === "user" ? "user" : "bot"}`}>
                                <p>{msg.text}</p>
                                {msg.properties && (
                                    <div className="property-list">
                                        {msg.properties.map((property, index) => (
                                            <div key={index} className="property-item">
                                                <p>Price: ${property.price.toLocaleString()}</p>
                                                <p>Location: {property.city}</p>
                                                <p>Street: {property.street}</p>
                                                <p>Type: {property.type}</p>
                                                <p>Bedrooms: {property.bed}</p>
                                                <p>Bathrooms: {property.bath}</p>
                                                <p>Square Feet: {property.sqft}</p>
                                                <p>Lot Size: {property.lot} sqft</p>
                                                <p>Built: {property.built}</p>
                                                <p>Garage: {property.garage} cars</p>
                                                <p>Listing Date: {new Date(property.listing_date).toLocaleDateString()}</p>
                                                <p>Listing Agent: {property.listing_agent}</p>
                                                <p>Description: {property.description}</p>
                                                <p>Listing Id: {property.listing_id}</p>
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
                            onChange={(e) => setInput(e.target.value)}
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