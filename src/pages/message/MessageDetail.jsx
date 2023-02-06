import {useState, useEffect} from 'react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserToken } from '../../utils/authToken'
import './messageDetail.css'
function MessageDetail (){
    const token = getUserToken()
    
    const [message, setMessage] = useState([])
    const [newText, setNewText] = useState("")
    const params = useParams()
    const {id} = params
    const navigate = useNavigate()

    if (!token){
        navigate('/auth')
    }
    const getMessage = async ()=>{
        try{
            const response = await fetch(`http://localhost:4000/messages/detail/${id}`)
            const foundMessage = await response.json()
            console.log(foundMessage._id)
            setMessage(foundMessage)
        } catch (err){
            console.log(err)
        }
    }

    useEffect(()=> {
        getMessage()
    },[])

    const removedMessage = async() => {
        try {
            const options = {
                method:"DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            
            }
            const response = await fetch(`http://localhost:4000/messages/detail/${id}`, options)
            const deletedMessage = await response.json
            navigate(-1)
        } catch(err){
            console.log(err)
        }
    }


    const updatedMessage = async (e) => {
        e.preventDefault()
        const newMessage = {
            _id: message._id,
            conversationId: message.conversationId,
            sender: message.sender,
            text: newText,
        }
        try {
            const requestOptions = {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newMessage)
            }
            const response = await fetch(`http://localhost:4000/messages/detail/${id}`, requestOptions)
            const updatedMessage2 = await response.json()
            setMessage(updatedMessage2)
            navigate(-1)
        } catch (err){
            console.log(err)
        }
    }



    return(
        <div className='detail-message'>
        <h1>Welcome to Edit/Delete Message page</h1>
        <div >
            <form onSubmit={updatedMessage}>
                <label> Edit Message:
                    <input
                        type="text"
                        value={newText}
                        onChange={(e)=>setNewText(e.target.value)}
                        id="edit-input"
                    />
                </label>
                <input type="submit" value="Edit message" id="submit-id"/>
            </form>
        </div>
        <div className='delete-btn'>
            <button onClick={removedMessage} id="delete-id">Delete message</button>
        </div>
        </div>
    )
    

}

export default MessageDetail