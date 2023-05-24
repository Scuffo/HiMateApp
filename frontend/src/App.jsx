import { Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage.jsx';
import Homepage from './pages/Homepage.jsx';
import "./App.css";

function App() {

  return (
    
    <div className="App">
         <Routes>
           <Route path="/" element={<Homepage/>} />
           <Route path="/chats" element={<ChatPage/>} />
        </Routes>
      </div>
  )
}

export default App
