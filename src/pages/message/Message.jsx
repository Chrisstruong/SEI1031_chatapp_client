import './message.css'
import {format} from "timeago.js"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import React from 'react'
import { VscKebabVertical } from "react-icons/vsc";
import { AiFillAccountBook } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
function Message({ message, own, currentConversation }) {
    const [isShown, setIsShown] = useState(false)
    const [member, setMember] = useState([])
    const [friend, setFriend] = useState([])
    const navigate = useNavigate()
    const {userId} = useParams()

    const friendId = currentConversation.members.find(function (id) {
        return id !== userId
    })

    const getMember = async () => {
        try {
            const response = await fetch(`http://localhost:4000/auth/${userId}`)
            const foundMember = await response.json()
            setMember(foundMember)
        } catch (err) {
            console.log(err)
        }
    }
    

    useEffect(() => {
        getMember()
    },[])

  


    const getFriend = async () => {
        try {
            const response = await fetch(`http://localhost:4000/auth/${friendId}`)
            const foundFriend = await response.json()
            setFriend(foundFriend)
        } catch (err) {
            console.log(err)
        }
    }
    

    useEffect(() => {
        getFriend()
    },[])
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {own?<img className='messageImg' src={member.avatarImage} alt="" />:<img className='messageImg' src={friend.avatarImage} alt="" />}
                <div className='messageText' onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>{setIsShown(false)}}>
                    <p className='p-text'>{message.text}</p>
                    <div className='edit-container'>
                    {isShown? <p className='edit' onClick={()=>navigate(`/message/${message._id}`)}>{<VscKebabVertical/>}</p>: ""}
                    </div>
                </div>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}

            </div>
        </div>
    )
}

export default Message