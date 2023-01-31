import React from "react";
import './messenger.css'
import Conversation from '../conversations/Conversations'
import Message from '../message/Message'
import ChatOnline from "../chatOnline/ChatOnline";


function Messenger() {
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder = "Search for friends" className="chatMenuInput"/>
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
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