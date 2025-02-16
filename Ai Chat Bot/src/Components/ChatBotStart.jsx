import React from 'react'
import './ChatStart.css'

const ChatBotStart = ({handleStartChat}) => {
  return (
    <div className='start-page'>
        <button className="start-page-btn" onClick={handleStartChat}>
            Chat AI
        </button>
        
    </div>
  )
}

export default ChatBotStart