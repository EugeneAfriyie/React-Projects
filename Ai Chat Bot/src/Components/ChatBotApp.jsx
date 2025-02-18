import React from 'react'
import { useState } from 'react';
import './ChatBotApp.css'

const ChatBotApp = ({handleGoBack,chats,setChats,handleDeleteChat}) => {

    const [inputValue,setInputValue] = useState('');
    const [messages,setMessages] = useState(chats[0]?.messages || []);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }


    const sendMessage = (e) => {
    if(inputValue.trim() === '') return;
        const newMessage = {
            type:'prompt',
            text: inputValue,
            time: new Date().toLocaleTimeString(),
        }

        const UpdatedMesages = [...messages,newMessage];
        setMessages(UpdatedMesages);
        setInputValue('');

        const UpdatedChat = chats.map((chat,index ) => {
            if(index === 0){
                return {
                    ...chat,
                    messages: UpdatedMesages
                }
            }
            
            return chat
            
        })
        
        setChats(UpdatedChat);
    
    }

    React.useEffect(() => {
        setMessages(chats[0]?.messages || []);
    }, [chats]);


    const handleKeyDown = (event) =>{
            if (event.key === "Enter") {
                sendMessage()
            }
    }

  return (
    <div className='chat-app'>
        <div className="chat-list">
            <div className="chat-list-header">
                <h2>Chat List</h2>
                <i className="bx bx-edit-alt new-chat"></i>
            </div>
            {chats.map((chat,index) =>(

                 <div key={index} className={`chat-list-item ${index === 0 ? 'active' : ''}`}>
                 <h4>{chat.id}</h4>
                 <i 
                    className="bx bx-x-circle"
                    onClick={() => handleDeleteChat(chat.id)}
                 
                 ></i>
             </div>
            ))}
           
        </div>
        <div className="chat-window">
            <div className="chat-title">
                <h3>Chat With AI</h3>
                <i onClick={handleGoBack} className="bx bx-arrow-back arrow"></i>
            </div>
            <div className="chat">

                {
                    messages.map((message,index) =>(
                        
                <div key={index} className={message.type === 'prompt'? 'prompt' : 'response'}>
                   {message.text} 
                    <span>{message.time}</span>
                </div>
                    ))
                }
                <div className="response">
                    Hello! I'm just a computer program, so i don't have feelings,but I'm here and ready to assist you. How Can I Help You Today?
                    <span>10:23:54 PM</span>
                </div>
                <div className="typing">Typing...</div>
                <form className='msg-form' onSubmit={(e) =>{
                    e.preventDefault()
                }}>
                    <i className="fa-solid fa-face-smile emoji"></i>
                    <input type="text"
                     value={inputValue}
                     placeholder='Type a message ......'
                     onChange = {handleInputChange}
                     className="msg-input"
                     onKeyDown={handleKeyDown}
                     />
                    <i onClick={()=>{sendMessage();}
                       
                    } className="fa-solid fa-paper-plane"></i>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ChatBotApp