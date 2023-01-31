import React, { useEffect, useState } from "react";
import './conversation.css'

function Conversation({conversation, currentUserId}){
    const [user, setUser] = useState(null)
    const friendId = conversation.members.find((m)=> m !== currentUserId)
    const getFriend = async() => {
        try {
            const response = await fetch("http://localhost:4000/member/"+friendId)
            const foundFriend = await response.json()
            console.log(foundFriend)
            setUser(foundFriend)
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
            src ="https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
            alt=""/>
            <span className="conversationName">Triet</span>            
         </div>
    )
}

export default Conversation