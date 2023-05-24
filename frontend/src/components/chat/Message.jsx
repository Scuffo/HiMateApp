import React, { useState, useRef } from "react";
import { Box, Text, Image, Flex, Icon } from "@chakra-ui/react";
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs";
import ReactPlayer from "react-player";

// Componente per la gestione di tutti i messaggi in base al campo type
const Message = ({ content, sender, isSentByCurrentUser, timestamp, msgType, mediaPath }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const messageAlignment = isSentByCurrentUser ? "flex-end" : "flex-start";
  const messageBackgroundColor = isSentByCurrentUser ? "#004848" : "#F5F5F5";
  const textColor = isSentByCurrentUser ? "#FFFFFF" : "#000000";
  const formattedTimestamp = new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Booleana che permette di mostrare il popup del video quando si preme play
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  // Permette di riprodurre l'audio quando si preme play
  const handleAudioToggle = () => {
    setIsAudioPlaying((prevState) => !prevState);
    const audioElement = audioRef.current;

    if (isAudioPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  };

  return (
    <Box bg={messageBackgroundColor} color={textColor} p={3} m={2} borderRadius={isSentByCurrentUser ? "20px 20px 0px 20px" : "20px 20px 20px 0px"} alignSelf={messageAlignment} boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" >
      
      {/* Gestione dei messaggi contenenti immagini */ }
      {msgType === "image" && mediaPath && (
        <Image src={"src" + mediaPath} alt="Immagine" maxH={200} objectFit="cover" mb={2} />
      )}

      {/* Gestione dei messaggi contenenti gif animate */ }
      {msgType === "gif" && mediaPath && (
        <Image src={"src" + mediaPath} alt="Immagine" maxH={200} objectFit="cover" mb={2} />
      )}

      {/* Gestione dei messaggi contenenti video */ }
      {msgType === "video" && mediaPath && (
        <>
          {!isVideoPlaying && (
            <Box position="relative" onClick={handleVideoPlay} cursor="pointer" maxH={200} mb={2} borderRadius="md" overflow="hidden" _hover={{ opacity: 0.8 }} display="flex" justifyContent="center" alignItems="center" >
             <Icon as={BsPlayFill} color="white" boxSize={8} zIndex={1} />  <Text>Play Video</Text>
            </Box>
          )}

          {isVideoPlaying && (
            <ReactPlayer ref={videoRef} url={"src" + mediaPath} controls width="100%" height="auto" style={{ marginBottom: "2px" }} />
          )}
        </>
      )}

      {/* Gestione dei messaggi audio */ }
      {msgType === "audio" && mediaPath && (
        <Flex align="center" mb={2}>
          <Text>Play Audio</Text>
          <Icon as={isAudioPlaying ? BsFillPauseFill : BsPlayFill} onClick={handleAudioToggle} color={isAudioPlaying ? "red" : "blue"} boxSize={6} mr={2} cursor="pointer" />
          <audio ref={audioRef} src={"src" + mediaPath} style={{ display: "none" }} />
        </Flex>
      )}

      {/* Gestione dei messaggi di testo */ }
      <Text>{content}</Text>
      <Text fontSize="sm" mt={2} color="#999999" textAlign={isSentByCurrentUser ? "right" : "left"}>
        {isSentByCurrentUser ? `Tu - ${formattedTimestamp}` : `${sender} - ${formattedTimestamp}`}
      </Text>
    </Box>
  );
};

export default Message;
