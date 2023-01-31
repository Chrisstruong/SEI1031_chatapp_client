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
    const BASE_URL = `http://localhost:4000/conversations/63d93777d6b390a57e393319`
    const getUserConversation = async() =>{
        try{
            const response = await fetch(BASE_URL)
            const foundUserConversation = await response.json()
            console.log(foundUserConversation)
            setConversations(foundUserConversation)
        } catch (err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getUserConversation()
    },[])
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder = "Search for friends" className="chatMenuInput"/>
                    {conversations.map((c)=> (
                        <Conversation conversation={c}/>
                    ))}
                </div>

            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                        <Message own={true}/>
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="write something..." ></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
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