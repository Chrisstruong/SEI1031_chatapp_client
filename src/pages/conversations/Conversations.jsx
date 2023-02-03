import React, { useEffect, useState } from "react";
import './conversation.css'
import { VscKebabVertical } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";


function Conversation({ conversation, currentUserId, currentConversation }) {
    const [isShown, setIsShown] = useState(false)
    const [isShownButton, setIsShownButton] = useState(false)
    const [Name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const friendId = conversation.members.find(function (id) {
        return id !== currentUserId
    })
    const getFriend = async () => {
        try {
            const response = await fetch("http://localhost:4000/auth/" + friendId)
            const foundFriend = await response.json()
            setName(foundFriend.username)
            setImage(foundFriend.avatarImage)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getFriend()
    }, [])


    const removedFriend = async (e) => {
        e.preventDefault()
        try{
            const options = {
                method:"DELETE",
            }
            const response = await fetch(`http://localhost:4000/conversations/delete/${currentConversation._id}`, options)
            const deletedFriend = await response.json
            window.location.reload(false)
        } catch(err){
            console.log(err)
        }
    }
    return (
        <div className="conversation" onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>{setIsShown(false); setIsShownButton(false)}}>
            <img className="conversationImg"
                src={image ? image : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"}
                alt="" />
            <span className="conversationName">{Name}</span>
            {isShown? <p className='edit' onClick={()=> {setIsShownButton(!isShownButton)}}>{<VscKebabVertical/>}</p>: ""}
            {isShownButton ? <button onClick={removedFriend} >Unfollow</button>: ""}
        </div>
    )
}

export default Conversation