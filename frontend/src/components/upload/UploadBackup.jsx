import React, { useState, useRef } from 'react';
import { FaUpload } from 'react-icons/fa';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { BsCloudUpload } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadBackup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

   // Logica di upload del file
  const handleFileUpload = (event) => {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setIsFileSelected(true);
  };

  function onReaderLoad(event) {
    setSelectedFile(event.target.result);
  }

 // Gestione dell'upload dei dati 
  const handleReplaceFile = () => {
    if (isFileSelected) {
      var messages = JSON.parse(selectedFile).messages;
      var users_and_groups = JSON.parse(selectedFile).users_and_groups;
      var group_members = JSON.parse(selectedFile).group_members;

      axios
        .post('http://localhost:3000/api/insert', {
          messages,
          users_and_groups,
          group_members,
        })
        .then(() => {
          navigate('/chats');
        })
        .catch((error) => {
          window.alert('Problema nell\'inserimento del file: ' + error);
        });
    } else {
      window.alert('Nessun file selezionato');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = onReaderLoad;
    reader.readAsText(file);
    setFileName(file.name);
    setIsFileSelected(true);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" maxWidth="500px" height="500px" bg="yellow.400" p="4" borderRadius="md" >
      <Text fontSize="2xl" fontFamily="Work sans">Carica il backup delle tue chat </Text>
      <Box className="dropzone" mb="4" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e)} bg="white" borderWidth="2px" borderStyle="dashed" borderRadius="md" p="4" textAlign="center" cursor="pointer" height="250px" width="80%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
        <Text fontSize="md">Trascina qui</Text>
      </Box>

      <Button leftIcon={<BsCloudUpload />} colorScheme="blue" variant="solid" size="lg" onClick={() => fileInputRef.current.click()} display={isFileSelected ? 'none' : 'block'} mt="2" width="80%" >
        Scegli file
      </Button>
      <Input type="file" accept=".json" onChange={handleFileUpload} display="none" id="upload" ref={fileInputRef} />

      {fileName && (
        <Text mt="2" fontSize="sm" fontWeight="bold" color="teal.500" textAlign="center">
         File: {fileName}
        </Text>
      )}

      {isFileSelected && (
        <Button leftIcon={<FaUpload />} colorScheme="teal" variant="solid" size="lg" onClick={handleReplaceFile} mt="4" width="80%" >
          Carica Backup
        </Button>
      )}
    </Box>
  );
};

export default UploadBackup;
