import React, { useEffect, useRef, useState } from "react";
import { ChatState } from "../../context/chatProvider";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, AttachmentIcon } from "@chakra-ui/icons";
import { FormControl } from "@chakra-ui/form-control";
import Message from "./Message";

const SingleChat = () => {
  const [newMessage, setNewMessage] = useState("");                 // Implementazione per l'invio da interfaccia di messaggi non persistenti
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);

  const { selectedChat, setSelectedChat, chats, messages, setMessages, loggedUser, groupsAndUsers } = ChatState();

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

const sendMessage = () => {                                           // Implementazione per l'invio da interfaccia di messaggi non persistenti
  const newMessageData = {
    from_id: loggedUser.id,
    id: null,
    media_path: null,
    msg_type: "text",
    reply_id: null,
    text: newMessage,
    to_id: selectedChat.id,
    timestamp: new Date().toISOString(),
  };

  const updatedMessages = [...messages, newMessageData];
  setMessages(updatedMessages);
  setNewMessage("");
};

// Permette di inviare messaggi anche premendo enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  // MODIFICARE: Permette di allegare immagine al messaggio
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  // Permette di recuperare il mittente del messaggio
  const getSenderName = (senderId) => {
    const user = chats.find((item) => item.id === senderId);
    return user ? user.name : "Nome sconosciuto";
  };

  return (
    <>
    {/* Se è stata selezionata una chat mostra un'interfaccia con la lista dei messaggi, altrimenti interfaccia neutra  */}
      {selectedChat ? (
        <>
          <Text fontSize={{ base: "28px", md: "30px" }} pb={3} px={2} w="100%" fontFamily="Work sans" d="flex" justifyContent={{ base: "space-between" }} alignItems="center">
            <IconButton d={{ base: "flex", md: "none" }} icon={<ArrowBackIcon />} onClick={() => setSelectedChat("")} />
            {messages && <>{selectedChat.name}</>}
          </Text>


          <Box d="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#E8E8E8" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
            <div className="messages">
              {/* Filtra i messaggi, se il destinatario è presente nella chat selezionata, oppure se sia mittente è presente e destinatario è utente con is_me === 1 */}
              {/* Poi mappa i messaggi, valutando se il mittente is_me e cercando il name del mittente  */}
              {messages
                .filter((message) => message.to_id === selectedChat.id || (message.from_id === selectedChat.id && message.to_id === loggedUser.id))
                .map((message) => {
                  const isSentByCurrentUser = message.from_id === loggedUser.id;
                  const senderName = getSenderName(message.from_id);

                  return (
                    <Message
                      key={message.id}
                      content={message.text}
                      sender={senderName}
                      chatName={selectedChat.name}
                      isSentByCurrentUser={isSentByCurrentUser}
                      timestamp={message.timestamp}
                      msgType={message.msg_type}
                      mediaPath={message.media_path}
                    />
                  );
                })}
              <div ref={messagesEndRef} />
            </div>

            {/* Form di inserimento del messaggio */}
            <Flex mt={3} alignItems="flex-end">
              <FormControl id="first-name" isRequired flexGrow={1} mr={2}>
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Invia un messaggio..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </FormControl>

              
            {/* Form di inserimento immagine ( non funzionante ) */}  
              <IconButton aria-label="Carica immagine" icon={<AttachmentIcon />} alignSelf="flex-end" mr={2}>
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
              </IconButton>
              <IconButton aria-label="Invia" icon={<ArrowForwardIcon />} onClick={sendMessage} alignSelf="flex-end" />
            </Flex>
            {selectedImage && (
              <Box mt={2}>
                <Text>Anteprima immagine:</Text>
                <img src={URL.createObjectURL(selectedImage)} alt="Anteprima immagine" />
              </Box>


            )}
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Cliccare su un utente per iniziare la chat
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
