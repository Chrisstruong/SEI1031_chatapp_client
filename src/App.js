import React from "react";
import { useState } from "react";
import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Messenger from "./pages/messenger/Messenger";
import SetAvatar from "./pages/SetAvatar";
import socketIO from 'socket.io-client'
import FakeAuthentication from "./pages/FakeAuthentication";
import Profile from "./pages/Profile";

const socket = socketIO('http://localhost:4000')

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom ]= useState("")

  const joinRoom = () => {
    if (username!=="" && room !="") {
      socket.emit("join_room", room)
    }
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<FakeAuthentication/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/avatar" element={<SetAvatar />}/>
        <Route path="/chat" element={<Chat />}/>
        <Route path='/messenger/:userId' element={<Messenger />}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
