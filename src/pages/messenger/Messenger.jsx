import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './messenger.css'
import Conversation from '../conversations/Conversations'
import Message from '../message/Message'
import ChatOnline from "../chatOnline/ChatOnline";

function Messenger() {
    let {userId} = useParams()
    const navigate = useNavigate()
    const[conversations, setConversations] = useState([])//this is for fetching the username and avatar in the contact list (member model)
    const[currentChat, setCurrentChat] = useState(null)// so as to control which user from contact list you are in so as to text
    const[messages, setMessages] = useState([]) //this is for fetching text content from message model
    const[newMessage, setNewMessage] = useState("")//This is for typing box when user texting
    const scrollRef = useRef()
    const BASE_URL = `http://localhost:4000/conversations/${userId}`

    const getUserConversation = async() =>{
        try{
            const response = await fetch(BASE_URL)
            const foundUserConversation = await response.json()
            setConversations(foundUserConversation)
        } catch (err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getUserConversation()
    },[])
    

    const getMessages = async() => {
        try {
            const response = await fetch('http://localhost:4000/messages/'+currentChat?._id)
            const foundMessage = await response.json()
            setMessages(foundMessage)
        } catch(err) {
            console.log(err)
        }
    }
    useEffect(()=> {
        getMessages()
    }, [currentChat])
    const handleSubmit = async (e) => {
        const message = {
            conversationId : currentChat._id,
            sender: userId,
            text: newMessage,
        }
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(message)
            }
            const response = await fetch('http://localhost:4000/messages', requestOptions)
            const createdMessage = await response.json()
            setMessages([...messages, createdMessage])
            setNewMessage("")
        } catch(err) {
            console.log(err)
        }
    }


    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])


    
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder = "Search for friends" className="chatMenuInput"/>
                    {conversations.map((c)=> (
                        <div onClick={()=> setCurrentChat(c)}>
                        <Conversation conversation={c} currentUserId={userId}/>
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
                        {messages.map((msg)=> (
                            <div ref={scrollRef}>
                            <Message message={msg} own={msg.sender === userId }/>
                            </div>
                        ))} 
                        {/* This function used for control orgranization of sender and receiver */}
                        
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="write something..." onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} ></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>
                            Send</button>
                    </div></> : <span className="noConversationText">Open a conversation to start</span>}
                </div>

            </div>

            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                </div>

            </div>
            <button onClick={()=>navigate(`/profile/${userId}`)}>go to profile</button>


        </div>
    )
}

export default Messenger