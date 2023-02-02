import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"


function FriendProfile() {
    // '3000:${usernma}:id:userId
    const {id} = useParams()
    const {userId} =useParams()
    const [conversation, setConversation] = useState([])
    const [friend, setFriend] = useState([])
    const [follow, setFollow] = useState(false)

    const getConversation = async () =>{
        try{
            const response = await fetch(`http://localhost:4000/conversations/${userId}`)
            const foundConversation = await response.json()
            setConversation(foundConversation)
        } catch(err){ 
            console.log(err)
        }
    }

    useEffect(()=>{
        getConversation()
    },[])


    const getFriend = async () => {
        try {
            const response = await fetch(`http://localhost:4000/member/${id}`)
            const foundFriend = await response.json()
            console.log(foundFriend)
            setFriend(foundFriend)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getFriend()
    },[])
    
    const onSearch = async (e) => {
        setFollow(true)
        const newFriend = {
            senderId: userId,
            receiverId: id,
        }
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(newFriend)
            }
            const response = await fetch('http://localhost:4000/conversations', requestOptions)
            const createdFriend = await response.json()
            setConversation([...conversation, createdFriend])
            console.log("hello")
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <>
        <h1>hello</h1>
        <h1>This is {friend.username}</h1>
        <button onClick={onSearch}>{follow?"Unfollow":"Follow"}</button>
        </>
    )
}

export default FriendProfile