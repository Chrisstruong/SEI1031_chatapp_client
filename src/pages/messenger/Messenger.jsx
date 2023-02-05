import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './messenger.css'
import Conversation from '../conversations/Conversations'
import Message from '../message/Message'
import ChatOnline from "../chatOnline/ChatOnline";
import Search from "../search/Search";
import { getUserToken, clearUserToken } from "../../utils/authToken";
import { BiChevronDown,BiChevronUp } from "react-icons/bi";
import hello from '../assets/hi.gif'

function Messenger() {
    const token = getUserToken()
    let { userId } = useParams()
    const navigate = useNavigate()
    const [conversations, setConversations] = useState([])//this is for fetching the username and avatar in the contact list (member model)
    const [currentChat, setCurrentChat] = useState(null)// so as to control which user from contact list you are in so as to text
    const [messages, setMessages] = useState([]) //this is for fetching text content from message model
    const [newMessage, setNewMessage] = useState("")//This is for typing box when user texting
    const [member, setMember] = useState([])
    const [open, setOpen] = useState(false)
    const [arrow, setArrow] = useState(false)
    const scrollRef = useRef()
    const BASE_URL = `http://localhost:4000/conversations/${userId}`

    if (!token) {
        navigate('/')
    }

    const getMember = async () => {
        try {
            const response = await fetch(`http://localhost:4000/auth/${userId}`)
            const foundMember = await response.json()
            setMember(foundMember)
        } catch (err) {
            console.log(err)
        }
    }

    const getUserConversation = async () => {
        try {
            const response = await fetch(BASE_URL)
            const foundUserConversation = await response.json()
            setConversations(foundUserConversation)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getUserConversation()
    }, [])

    useEffect(() => {
        getMember()
    }, [])

    const getMessages = async () => {
        try {
            const response = await fetch('http://localhost:4000/messages/' + currentChat?._id)
            const foundMessage = await response.json()
            setMessages(foundMessage)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getMessages()
    }, [currentChat])
    const handleSubmit = async (e) => {
        const message = {
            conversationId: currentChat._id,
            sender: userId,
            text: newMessage,
            owner: userId
        }
        console.log(userId)
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(message)
            }
            const response = await fetch('http://localhost:4000/messages', requestOptions)
            const createdMessage = await response.json()
            setMessages([...messages, createdMessage])
            console.log(messages)
            setNewMessage("")
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
          handleSubmit()
        }
      }


    return (
        <div className="real-big-container">
            {open ? 
            <div className="flex flex-col dropDownProfile">
                <ul className="flex flex-col gap-4" style={{"listStyle": "none"}}>
                    <li className="lii" onClick={() => navigate(`/profile/${userId}`)}>Profile</li>
                    <li className="lii3" onClick={() => {
                    clearUserToken()
                    navigate('/')
                }}>Sign Out</li>
                </ul>
            </div> : ""}

            <div className="image-container" >
                {member.avatarImage?<img id="avatar" src={member.avatarImage} alt="" onClick={() => {setOpen(!open); setArrow(!arrow)}}/>: <img id="avatar" src="https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg" alt="" onClick={() => {setOpen(!open); setArrow(!arrow)}}/>} 
                {arrow? <BiChevronUp id="arrowdown" onClick={() => {setOpen(!open); setArrow(!arrow)}}/> :<BiChevronDown id="arrowdown" onClick={() => {setOpen(!open); setArrow(!arrow)}}/>}
                
            </div>

            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        {/* <input placeholder = "Search for friends" className="chatMenuInput"/>} */}
                        <Search className="chatMenuInput" ID={userId}  />
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)} >
                                <Conversation conversation={c} currentUserId={userId} currentConversation={currentChat} />
                            </div>
                        ))}
                    </div>

                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                <>
                                    <div className="chatBoxTop">
                                        {messages.map((msg) => (
                                            <div ref={scrollRef}>
                                                <Message message={msg} own={msg.sender === userId} currentConversation={currentChat} />
                                            </div>
                                        ))}
                                        {/* This function used for control orgranization of sender and receiver */}

                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea className="chatMessageInput" placeholder="write something...(shift + enter to start new line)" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} onKeyDown={onEnterPress}></textarea>
                                        <button className="chatSubmitButton" onClick={handleSubmit}>
                                            Send</button>
                                    </div></> : <><img src={hello} alt ="" className="noConversationGif" /><p className="noConversationText">Click to start</p></>}
                    </div>

                </div>

                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>

                </div>
                {/* <button onClick={() => navigate(`/profile/${userId}`)}>go to profile</button>
                <button onClick={() => {
                    clearUserToken()
                    navigate('/')
                }}>Sign Out</button> */}


            </div>
        </div>
    )
}

export default Messenger