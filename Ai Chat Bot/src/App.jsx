import { useState } from 'react'
import ChatBotApp from './Components/ChatBotApp'
import ChatBotStart from './Components/ChatBotStart'

const App = () => {
  const [isChatting,setIsChatting] = useState(false);
  const [chats,setChats] = useState([]);

  const handleStartChat = () => {
    setIsChatting(true);
    if (chats.length === 0){
      const newChat = {
    id: `chat ${new Date().toLocaleDateString('en-OB')} ${new Date().toDateString()}`,
    messages:[],
      }
      setChats([newChat])
    }  }

  const handleGoBack = () => {  
    setIsChatting(false);
  }
  return (
    <div className='container'>
      {
      isChatting ? <ChatBotApp 
        handleGoBack={handleGoBack}
        chats={chats}
        setChats={setChats} 
      /> 
      :
       <ChatBotStart handleStartChat={handleStartChat}/>}
    
    </div>
  )
}

export default App