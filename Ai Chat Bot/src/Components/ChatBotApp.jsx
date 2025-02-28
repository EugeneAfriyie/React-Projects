import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import './ChatBotApp.css'
// import { Picker } from '@emoji-mart/react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';





const ChatBotApp = ({ handleGoBack, chats, setChats, handleDeleteChat,setIsTyping,isTyping, onNewchat, setActiveChat, activeChat }) => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState(chats[0]?.messages || []);
    const chatEndRef = useRef(null);
    const [showEmojiPicker,setShowEmojiPicker] = useState(false);
    const [showChatList, setShowChatList] = useState(false);


    useEffect(() => {
        const activeChatObj = chats.find(chat => chat.id === activeChat);
        setMessages(activeChatObj ? activeChatObj.messages : []);



        if(activeChat){
            const storedMessages = JSON.parse(localStorage.getItem(activeChat));
            if (storedMessages) {
                setMessages(storedMessages);
            } else {
                localStorage.setItem(activeChat, JSON.stringify([]));
        }
    }
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

        if(!activeChat){

        onNewchat(newMessage)
        }else{
            const undatedMessages =  [...messages, newMessage]
            setMessages(undatedMessages);
            setInputValue('');
            localStorage.setItem(activeChat, JSON.stringify(undatedMessages));
        }

        const updatedChat = chats.map((chat) => {
            if (chat.id === activeChat) {
                return {
                    ...chat,
                    messages: [...chat.messages, newMessage],
                };
            }
            return chat;
        });
        setChats(updatedChat);
        localStorage.setItem('chats', JSON.stringify(updatedChat));
        setIsTyping(true);

    
        
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
            isTyping(false);

            undatedMessagesWithResponse = [...undatedMessages, newResponse]
    
            setMessages(undatedMessagesWithResponse);
            localStorage.setItem(activeChat, JSON.stringify(undatedMessagesWithResponse));
            const updatedChatWithResponse = chats.map((chat) => {
                if (chat.id === activeChat) {
                    return {
                        ...chat,
                        messages: undatedMessagesWithResponse,
                    };
                }
                return chat;
            });
            setChats(updatedChatWithResponse);
            localStorage.setItem('chats', JSON.stringify(updatedChatWithResponse));
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

    useEffect(() =>{
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    },[messages])

    const handleEmojiSelect = (emoji) =>{
        setInputValue((preInput) => preInput + emoji.native);
    }


    return (
        <div className='chat-app'>
            <div className={`chat-list ${showChatList ? 'show' : ''}`}>
                <div className="chat-list-header">
                    <h2>Chat List</h2>
                    <i className="bx bx-edit-alt new-chat" onClick={() => onNewchat(null)}></i>
                <i className="bx bx-x-circle close-list" onClick={() => setShowChatList(false)}></i>

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
                    <i className="bx bx-menu menu" onClick={() => setShowChatList(true)}></i>
                    <i onClick={handleGoBack} className="bx bx-arrow-back arrow"></i>
                </div>
                <div className="chat">
                    {messages.map((message, index) => (
                        <div key={index} className={message.type === 'prompt' ? 'prompt' : 'response'}>
                            {message.text}
                            <span>{message.time}</span>
                        </div>
                    ))}
                
                    <div className="typing">{isTyping ?'Typing...': ''}</div>
                    <div className="" ref={chatEndRef}></div>
                    <form className='msg-form' onSubmit={(e) => e.preventDefault()}>
                        <i className="fa-solid fa-face-smile emoji" onClick={() => setShowEmojiPicker((prev) => !prev)}></i>
                        {showEmojiPicker && <div className="picker">
                            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                            </div>}
                        <input
                            type="text"
                            value={inputValue}
                            placeholder='Type a message ......'
                            onChange={handleInputChange}
                            className="msg-input"
                            onKeyDown={handleKeyDown}
                            onFocus={() => setShowEmojiPicker(false)}
                        />
                        <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatBotApp;


