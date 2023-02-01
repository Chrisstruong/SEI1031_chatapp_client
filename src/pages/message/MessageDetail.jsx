import {useState, useEffect} from 'react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
function MessageDetail (){
    const [message, setMessage] = useState([])
    const [newText, setNewText] = useState("")
    const params = useParams()
    const {id} = params
    const navigate = useNavigate()

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
        console.log(newMessage.text)
        try {
            const requestOptions = {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
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
        <>
        <h1>Welcome to Edit/Delete Message page</h1>
        <div>
            <form onSubmit={updatedMessage}>
                <label> Edit Message:
                    <input
                        type="text"
                        value={newText}
                        onChange={(e)=>setNewText(e.target.value)}
                    />
                </label>
                <input type="submit" value="Edit message"/>
            </form>
        </div>
        <div>
            <button onClick={removedMessage}>Delete message</button>
        </div>
        </>
    )
    

}

export default MessageDetail