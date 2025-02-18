import { useState } from 'react'
import ChatBotApp from './Components/ChatBotApp'
import ChatBotStart from './Components/ChatBotStart'

const App = () => {
  const [isChatting,setIsChatting] = useState(false);
  const [chats,setChats] = useState([]);
  const [activeChat,setActiveChat] = useState[null];



  const createNewChat = () =>{

    const newChat = {
      id: `chat ${new Date().toLocaleDateString('en-OB')} ${new Date().toDateString()}`,
      messages:[],
        }

        const updatedChat = [newChat,...chats];
        setChats(updatedChat);
        setActiveChat(newChat.id)
  }

  const handleStartChat = () => {
    setIsChatting(true);

    if (chats.length === 0){
      createNewChat();
   
    }  }

    // const handleDeleteChat = (index) =>{
    //   const filterChat= chats.filter((chat) => chat.id !== index)

    //   setChats(filterChat)
    // }

    const handleDeleteChat = (index) => {
      const filteredChats = chats.filter((chat) => chat.id !== index);
      setChats(filteredChats);
  };
  

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
        handleDeleteChat={handleDeleteChat}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        onNewchat={createNewChat}
      /> 
      :
       <ChatBotStart handleStartChat={handleStartChat}/>}
    
    </div>
  )
}

export default App