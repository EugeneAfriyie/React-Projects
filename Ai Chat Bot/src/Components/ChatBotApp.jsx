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

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const sendMessage = () => {
        if (!inputValue.trim()) return;  // Prevent empty messages
        const newMessage = {
            type: 'prompt',
            text: inputValue,
            time: new Date().toLocaleTimeString(),
        };
      

        if (chats.length === 0){
            onNewchat(newMessage);
           }



        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setInputValue('');
        


    //    const updatedChats = chats.map(chat =>
    //     chat.id === activeChat ? { ...chat, messages: updatedMessages } : chat
    // );

    //     setChats(updatedChats);
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


