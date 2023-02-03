import React from "react";
import { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Messenger from "./pages/messenger/Messenger";
import SetAvatar from "./pages/SetAvatar";
import FakeAuthentication from "./pages/FakeAuthentication";
import Profile from "./pages/Profile";
import MessageDetail from "./pages/message/MessageDetail";
import FriendProfile from "./pages/friends/FriendProfile";

import Home from "./pages/Home";
import Auth from "./pages/Auth";

import { UserContext } from "./data";
console.log(UserContext)


function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const { Provider: UserInfo } = UserContext
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <div className="App">
      <UserInfo value={{
        isAuthenticated, 
        currentUser, 
        setAuth: setIsAuthenticated, 
        setUser: setCurrentUser
      }}>
        <Routes>
          {/* <Route path='/' element={<FakeAuthentication />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/avatar" element={<SetAvatar />} />
          <Route path="/chat" element={<Chat />} />
          <Route path='/messenger/:userId' element={<Messenger />} />
          <Route path='/message/:id' element={<MessageDetail />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/profile/:username/:id/:userId' element={<FriendProfile />} />

          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Auth />} />
        </Routes>
      </UserInfo>
    </div>
  );
}

export default App;
