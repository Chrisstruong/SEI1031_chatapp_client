import React from "react";
import './app.css'
import { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Messenger from "./pages/messenger/Messenger";
import SetAvatar from "./pages/SetAvatar";
import Profile from "./pages/Profile";
import MessageDetail from "./pages/message/MessageDetail";
import FriendProfile from "./pages/friends/FriendProfile";

import Home from "./pages/Home";
import Auth from "./pages/Auth";

import { UserContext } from "./data";
import LoginPage from "./pages/LoginPage";
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
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/chat" element={<Chat />} />
          <Route path='/messenger/:userId' element={<Messenger />} />
          <Route path='/message/:id' element={<MessageDetail />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/profile/:username/:id/:userId' element={<FriendProfile />} />

          <Route path='/home' element={<Home />} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<Auth/>}/>
          <Route path="/register/setAvatar/:userId" element={<SetAvatar />} />

        </Routes>
      </UserInfo>
    </div>
  );
}

export default App;
