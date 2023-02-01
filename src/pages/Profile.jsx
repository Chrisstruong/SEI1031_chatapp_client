import { useState, useEffect } from "react"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"


function Profile () {
    const [member, setMember] = useState([])
    const [newName, setNewName] = useState("")
    const [newAvatar, setNewAvatar] = useState("")
    const params = useParams()
    const {userId} = params
    const navigate = useNavigate()
    const deleteURL = `http://localhost:4000/member/${userId}`
    const getMember = async () => {
        try {
            const response = await fetch(`http://localhost:4000/member/${userId}`)
            const foundMember = await response.json()
            setMember(foundMember)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        getMember()
    }, [])


    const removedMember = async () => {
        try {
            const options = {
                method: "DELETE",
            }
            const response = await fetch(deleteURL, options)
            const deletedReview = await response.json
        } catch(err){
            console.log(err)
            navigate('/')
        }
    }
    const updatedMember = async (e) => {
        e.preventDefault()
        const member = {
            _id: userId,
            username: newName,
            avatarImage: newAvatar
        }
        try {
            const requestOptions = {
                method:"PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body:JSON.stringify(member)
            }
            const response = await fetch(`http://localhost:4000/member/${userId}`)
            const updatedMember = await response.json()
            setMember(updatedMember)
            console.log(member)
            // navigate('/')
        } catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <h1>Profile</h1>
            <div>
                <form onSubmit={updatedMember}>
                    <label> Enter your new name:
                        <input
                        type="text"
                        value={newName}
                        onChange={(e)=> setNewName(e.target.value)}
                        />
                    </label>
                    <label> Enter your new avatar link:
                        <input
                        type="text"
                        value={newAvatar}
                        onChange={(e)=> setNewAvatar(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="updated profile"/>
                </form>
            </div>
        </>
    )
}

export default Profile