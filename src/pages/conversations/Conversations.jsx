import React, { useEffect, useState } from "react";
import './conversation.css'

function Conversation({conversation, currentUserId}){
    const [Name, setName] = useState([])
    const [image, setImage] = useState(null)
    const friendId = conversation.members.find(function(id){
        return id!==currentUserId
    })
    const getFriend = async() => {
        try {
            const response = await fetch("http://localhost:4000/member/"+friendId)
            const foundFriend = await response.json()
            setName(foundFriend.username)
            setImage(foundFriend.avatarImage)
        }catch(err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getFriend()
    },[])
    return(
        <div className="conversation">
            <img className="conversationImg" 
            src = {image ? image : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"}
            alt=""/>
            <span className="conversationName">{Name}</span>  
         </div>
    )
}

export default Conversation