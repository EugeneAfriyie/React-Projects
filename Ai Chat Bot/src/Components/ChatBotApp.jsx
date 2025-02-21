import React, { useEffect } from 'react'
import { useState } from 'react';
import './ChatBotApp.css'

const ChatBotApp = ({ handleGoBack, chats, setChats, handleDeleteChat, onNewchat, setActiveChat, activeChat }) => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState(chats[0]?.messages || []);

    useEffect(() => {
        const activeChatObj = chats.find(chat => chat.id === activeChat);
        setMessages(activeChatObj ? activeChatObj.messages : []);
        // console.log(activeChat);
    }, [activeChat, chats]);

    const handleInputChange =  (e) => {
        setInputValue(e.target.value);
    };

    const sendMessage = async () => {
        if (!inputValue.trim()) return;
    
        const newMessage = {
            type: 'prompt',
            text: inputValue,
            time: new Date().toLocaleTimeString(),
        };

        onNewchat(newMessage)
    
        setMessages([...messages, newMessage]);
        setInputValue('');
    
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: inputValue }] }]
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.error) {
                console.error("API Error:", data.error.message);
                alert(`API Error: ${data.error.message}`);
                return;
            }
    
            const chatResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
    
            const newResponse = {
                type: 'response',
                text: chatResponse,
                time: new Date().toLocaleTimeString(),
            };
    
            setMessages((prevMessages) => [...prevMessages, newResponse]);
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Network error. Please check your connection.");
        }
    };
    

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            sendMessage();
        }
    };

    const handleSelectedChat = (id) => {
        setActiveChat(id);
    };


    return (
        <div className='chat-app'>
            <div className="chat-list">
                <div className="chat-list-header">
                    <h2>Chat List</h2>
                    <i className="bx bx-edit-alt new-chat" onClick={() => onNewchat(null)}></i>
                </div>
                {chats.map((chat, index) => {
                    // console.log(`chat id - ${chat.id} and activeChat is ${activeChat}`);
                    return (
                        <div
                            key={index}
                            className={`chat-list-item ${chat.id === activeChat ? 'active' : ''}`}
                            onClick={() => handleSelectedChat(chat.id)} // ✅ Fix
                        >
                            <h4>{chat.displayId}</h4>
                            <i className="bx bx-x-circle"  onClick={(e) =>{ handleDeleteChat(chat.id) ;e.stopPropagation(); }}></i>
                        </div>
                    );
                })}
            </div>

            <div className="chat-window">
                <div className="chat-title">
                    <h3>Chat With AI</h3>
                    <i onClick={handleGoBack} className="bx bx-arrow-back arrow"></i>
                </div>
                <div className="chat">
                    {messages.map((message, index) => (
                        <div key={index} className={message.type === 'prompt' ? 'prompt' : 'response'}>
                            {message.text}
                            <span>{message.time}</span>
                        </div>
                    ))}
                
                    <div className="typing">Typing...</div>
                    <form className='msg-form' onSubmit={(e) => e.preventDefault()}>
                        <i className="fa-solid fa-face-smile emoji"></i>
                        <input
                            type="text"
                            value={inputValue}
                            placeholder='Type a message ......'
                            onChange={handleInputChange}
                            className="msg-input"
                            onKeyDown={handleKeyDown}
                        />
                        <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatBotApp;


