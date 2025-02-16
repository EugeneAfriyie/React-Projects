import { useState } from 'react'
import ChatBotApp from './Components/ChatBotApp'
import ChatBotStart from './Components/ChatBotStart'

const App = () => {
  const [isChatting,setIsChatting] = useState(false);
  const handleStartChat = () => {
    setIsChatting(true);
    console.log( isChatting);
  }

  const handleGoBack = () => {  
    setIsChatting(false);
  }
  return (
    <div className='container'>
      {isChatting ? <ChatBotApp handleGoBack={handleGoBack}/> : <ChatBotStart handleStartChat={handleStartChat}/>}
    
    </div>
  )
}

export default App