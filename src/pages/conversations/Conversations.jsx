import React, { useEffect, useState } from "react";
import './conversation.css'

function Conversation({conversation}){
    const [user, setUser] = useState(null)

    function friendId (){

    }

    useEffect(()=>{
        friendId()
    },[])
    return(
        <div className="conversation">
            <img className="conversationImg" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt=""/>
            <span className="conversationName">John Doe</span>            
         </div>
    )
}

export default Conversation