import React from 'react'

const ChatBotApp = () => {
  return (
    <div className='chat-app'>
        <div className="chat-list">
            <div className="chat-list-header">
                <h2>Chat List</h2>
                <i className="bx bx-edit-alt new-chat"></i>
            </div>
            <div className="chat-list-item">
                <h4>Chat 15/02/2025 10:09 PM</h4>
                <i className="bx bx-x circle"></i>
            </div>
            <div className="chat-list-item">
                <h4>Chat 15/02/2025 10:09 PM</h4>
                <i className="bx bx-x circle"></i>
            </div>
            <div className="chat-list-item">
                <h4>Chat 15/02/2025 10:09 PM</h4>
                <i className="bx bx-x circle"></i>
            </div>
        </div>
        <div className="chat-window">
            <div className="chat-title">
                <h3>Chat With AI</h3>
                <i className="bx-bx-arrow-back arrow"></i>
            </div>
            <div className="chat">
                <div className="prompt">
                    Hi, how are you doing ?
                    <span>10:23:54 PM</span>
                </div>
                <div className="response">
                    Hello! I'm just a computer program, so i don't have feelings,but I'm here and ready to assist you. How Can I Help You Today?
                    <span>10:23:54 PM</span>
                </div>
                <div className="typing">Typing....</div>
                <form className='msg-form'>
                    <i className="fa-solid fa-face smile emoji"></i>
                    <input type="text" placeholder='Type a message ......' className="msg-input" />
                    <i className="fa-solid fa-paper-plane"></i>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ChatBotApp