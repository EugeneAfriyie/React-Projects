import { useState } from 'react'
import ChatBotApp from './Components/ChatBotApp'
import ChatBotStart from './Components/ChatBotStart'
import {v4 as uuidv4} from 'uuid'

const App = () => {
  const [isChatting,setIsChatting] = useState(false);
  const [chats,setChats] = useState([]);
  const [activeChat,setActiveChat] = useState(null);



  const createNewChat = (initialMessage) =>{

    const newChat = {
            id: uuidv4(),
            displayId: `chat ${new Date().toLocaleDateString('en-OB')} ${new Date().toLocaleTimeString()}`,
            messages: initialMessage ? [initialMessage] : []
          }
        const updatedChat = [newChat,...chats];
        console.log(updatedChat);
        setChats(updatedChat);
        setActiveChat(newChat.id)
        console.log("Received initialMessage:", initialMessage);


  }

    const handleStartChat = () => {
      setIsChatting(true);
      // console.log

        // if (chats.length === 0){
        //   createNewChat();
      
        // }  
    }

    // const handleDeleteChat = (index) =>{
    //   const filterChat= chats.filter((chat) => chat.id !== index)

    //   setChats(filterChat)
    // }

    const handleDeleteChat = (id) => {
      const filteredChats = chats.filter((chat) => chat.id !== id);
      setChats(filteredChats);

      if (id === activeChat) {
        const newActiveChat = filteredChats.length > 0 ? filteredChats[0].id : null;
        setActiveChat(newActiveChat);
      }
   
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