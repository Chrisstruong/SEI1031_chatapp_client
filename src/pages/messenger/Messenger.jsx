import React, { useEffect, useState } from "react";
import './messenger.css'
import Conversation from '../conversations/Conversations'
import Message from '../message/Message'
import ChatOnline from "../chatOnline/ChatOnline";
import { useContext } from "react";
import axios from "axios";
import userEvent from "@testing-library/user-event";


function Messenger() {
    const[conversations, setConversations] = useState([])
    const[currentChat, setCurrentChat] = useState(null)
    const[messages, setMessages] = useState(null)
    const BASE_URL = `http://localhost:4000/conversations/63d93777d6b390a57e393319`
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

    console.log(messages)
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder = "Search for friends" className="chatMenuInput"/>
                    {conversations.map((c)=> (
                        <div onClick={()=> setCurrentChat(c)}>
                        <Conversation conversation={c} currentUserId={"63d93777d6b390a57e393319"}/>
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
                            <Message message={msg} own={msg.sender === "63d93777d6b390a57e393319" }/>
                        ))}
                        
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="write something..." ></textarea>
                        <button className="chatSubmitButton">Send</button>
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


        </div>
    )
}

export default Messenger