    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App.jsx'
    import { ChakraProvider } from '@chakra-ui/react'
    import { BrowserRouter } from 'react-router-dom';
    import ChatProvider from './context/chatProvider'; 
    import { Route, Routes } from 'react-router-dom';

    ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider>
        <BrowserRouter>
        <ChatProvider>
            <App />
        </ChatProvider>
        </BrowserRouter>
    </ChakraProvider>
    )
