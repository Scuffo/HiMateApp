  import React, { createContext, useContext, useEffect, useState } from "react";
  import axios from "axios";


  // Utilizzo del context per rendere lo state disponibile in tutte le componenti del progetto
  const ChatContext = createContext();

  const ChatProvider = ({ children }) => {      
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();
    const [messages, setMessages] = useState();
    const [loggedUser, setLoggedUser] = useState();
    const [groups, setGroups] = useState();
    const [groupsAndUsers, setGroupsAndUsers] = useState([]);

  // Get di users_and_groups finalizzata al recupero dell'utente con campo is_me=1
  const fetchLoggedUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/users");
        const foundItem = data.find((item) => item.is_me === 1);
        setLoggedUser(foundItem);
      } catch (error) {
        console.log(error);
      }
    };

  // Get di users_and_groups    
  const fetchChats = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/users");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get dei messages
  const fetchMessages = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/messages"); 
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get dei group_members
  const fetchGroups = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/groups"); 
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoggedUser();
    fetchChats();
    fetchMessages();
    fetchGroups();
  }, []);


    return (
      <ChatContext.Provider
        value={{
          selectedChat,
          setSelectedChat,
          user,
          setUser,
          notification,
          setNotification,
          chats,
          setChats,
          messages,
          setMessages,
          loggedUser,
          setLoggedUser,
          groups,
          setGroups, 
          groupsAndUsers,
          setGroupsAndUsers
        }}
      >
        {children}
      </ChatContext.Provider>
    );
  };

  export const ChatState = () => {
    return useContext(ChatContext);
  };

  export default ChatProvider;