import React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import './friendProfile.css'


function FriendProfile() {
    // '3000:${usernma}:id:userId
    const {id} = useParams()
    const navigate = useNavigate()
    const {userId} =useParams()
    const [conversation, setConversation] = useState([])
    const [currentConversation, setCurrentConversation] = useState()
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
            const response = await fetch(`http://localhost:4000/auth/${id}`)
            const foundFriend = await response.json()
            setFriend(foundFriend)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getFriend()
    },[])
    
    const onSearch = async (e) => {
        setFollow(!follow)
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
            console.log(conversation)
            navigate(-1)
            
        } catch(err) {
            console.log(err)
        }
    }
 
    // const removedConversation = async (e) => {
    //     e.preventDefault()
    //     setCurrentConversation()
    //     try{
    //         const options = {
    //             method:"DELETE",
    //         }
    //         const response = await fetch(`http://localhost:4000/conversations/delete/${currentConversation._id}`, options)
    //         const deletedFriend = await response.json
    //     } catch(err){
    //         console.log(err)
    //     }
    // }


    return (
        <>
         <div className="profile-container">
            <div className="sub-profile-container">
                <div id="background">
                    <img id="background2" src="https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
                </div>
                <div className="combine2">
                    <div className="profile-info">
                       {friend.avatarImage? <img id="profile-avatar" src={friend.avatarImage} alt={friend.username}/>: <img id="profile-avatar" src="https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg" alt="" />}
                        <p>{friend.username}</p>
                    </div>
                    <div className="btn-container">
                     <button onClick={onSearch} id="btnn">Follow</button> 
                     </div>
                
                </div>
            </div>
        </div>
      
        </>
    )
}

export default FriendProfile