import './message.css'
import {format} from "timeago.js"
import { useState } from 'react'
import React from 'react'
import { IconCgMoreVerticalAltName } from "react-icons/cg";
function Message({ message, own }) {
    const [isShown, setIsShown] = useState(false)
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className='messageImg' src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" alt="" />
                <p className='messageText' onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>setIsShown(false)}>
                    {message.text}
                    {isShown? <div></div>: ""}
                </p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}

            </div>
        </div>
    )
}

export default Message