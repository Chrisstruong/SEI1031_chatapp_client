import React from "react";
import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Chat from './pages/Chat'
import Login from './pages/Login'
import SetAvatar from "./pages/SetAvatar";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/avatar" element={<SetAvatar />}/>
        <Route path="/chat" element={<Chat />}/>
      </Routes>
    </div>
  );
}

export default App;
