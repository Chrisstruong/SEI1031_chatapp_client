import './message.css'
import {format} from "timeago.js"
import { useState } from 'react'
import React from 'react'
import { VscKebabVertical } from "react-icons/vsc";import { AiFillAccountBook } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
function Message({ message, own }) {
    const [isShown, setIsShown] = useState(false)
    const navigate = useNavigate()
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className='messageImg' src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" alt="" />
                <div className='messageText' onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>setIsShown(false)}>
                    <p>{message.text}</p>
                    {isShown? <p className='edit' onClick={()=>navigate(`/message/${message._id}`)}>{<VscKebabVertical/>}</p>: ""}
                </div>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}

            </div>
        </div>
    )
}

export default Message