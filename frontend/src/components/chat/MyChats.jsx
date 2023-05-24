import { Box, Stack, Text, Flex } from "@chakra-ui/react";
import { FaUsers, FaUserCircle } from "react-icons/fa";
import { ChatState } from "../../context/chatProvider";
import ChatLoading from "./ChatLoading";
import { useEffect } from "react";

const MyChats = () => {
  const { selectedChat, setSelectedChat, chats, messages, groups, setGroupsAndUsers } = ChatState();
  

  return (
    <Box d={{ base: selectedChat ? "none" : "flex", md: "flex" }} flexDir="column" alignItems="center" p={3} bg="white" w={{ base: "100%", md: "31%" }} borderRadius="lg" borderWidth="1px" >
      <Box pb={3} px={3} fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" d="flex" w="100%" justifyContent="space-between" alignItems="center" >
        Le mie Chat
      </Box>

      {/* Mostra solo le chat i cui messaggi hanno come mittente o destinatario l'user con is_me === 1, oppure le chat di gruppo */ }
      <Box d="flex" flexDir="column" p={3} bg="#F8F8F8" w="100%" h="100%" borderRadius="lg" overflowY="hidden" >
        {chats ? (
          <Stack overflowY="scroll">

            {chats.filter((chat) => {
                const shouldShowChat = messages && messages.some((message) => {
                    return (
                      chat.id === message.from_id &&
                      (message.to_id === 1 || message.from_id === 1)
                    );
                  });
                return (chat.is_me !== 1 && shouldShowChat) || chat.is_group;
            })
              
              .map((chat) => (
                <Flex onClick={() => setSelectedChat(chat)} cursor="pointer" bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"} color={selectedChat === chat ? "white" : "black"} px={3} py={2} borderRadius="lg" key={chat.id} alignItems="center" >
                  {chat.is_group ? ( <FaUsers size={18} style={{ marginRight: "5px" }} />
                  ) : (
                    <FaUserCircle size={18} style={{ marginRight: "5px" }} />
                  )}
                  <Text>{chat.name}</Text>
                </Flex>
              ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
