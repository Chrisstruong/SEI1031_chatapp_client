import { useState, useEffect } from "react"
import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getUserToken } from "../utils/authToken"
import './profile.css'


function Profile() {
    const token = getUserToken()
    const [member, setMember] = useState([])
    const [newName, setNewName] = useState("")
    const [newAvatar, setNewAvatar] = useState("")
    const [avatarClicking, setAvatarClicking] = useState("")
    const params = useParams()
    const { userId } = params
    const navigate = useNavigate()
    let randomNum1 = Math.floor(Math.random() * 500)
    let randomNum2 = Math.floor(Math.random() * 500)
    let randomNum3 = Math.floor(Math.random() * 500)
    const avatarArray = [`https://api.multiavatar.com/${randomNum1}.png`,`https://api.multiavatar.com/${randomNum2}.png`, `https://api.multiavatar.com/${randomNum3}.png`]
    const deleteURL = `https://chatapp-server.herokuapp.com/auth/${userId}`
    const getMember = async () => {
        try {
            const response = await fetch(`https://chatapp-server.herokuapp.com/auth/${userId}`)
            const foundMember = await response.json()
            setMember(foundMember)
            setNewName(foundMember.username)
            setNewAvatar(foundMember.avatarImage)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMember()
    }, [])


    const updatedMember = async (e) => {
        e.preventDefault()
        const newMember = {
            _id: userId,
            username: newName,
            avatarImage: newAvatar
        }
        console.log(newMember.avatarImage)
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newMember)
            }
            const response = await fetch(`https://chatapp-server.herokuapp.com/auth/${userId}`, requestOptions)
            const updatedMember = await response.json()
            setMember(updatedMember)
            console.log(member)
            navigate(`/messenger/${userId}`)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="profile-container">
            <div className="sub-profile-container">
                <div id="background">
                    <img id="background2" src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
                </div>
                <div className="combine2">
                    <div className="profile-info">
                       {member.avatarImage? <img id="profile-avatar" src={member.avatarImage} alt={member.username}/>: <img id="profile-avatar" src="https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg" alt="" />}
                        <p>{member.username}</p>
                    </div>

                    <div >
                        <form onSubmit={updatedMember} className="profile-form">
                            <label>New name:
                                <input
                                    type="text"
                                    id="profile-form-input"
                                    placeholder="This also change your username"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </label>
                            <label >New avatar link:
                                <br />
                                
                                <input
                                    type="text"
                                    id="profile-form-input2"
                                    value={newAvatar}
                                    onChange={(e) => setNewAvatar(e.target.value)}
                                />
                                
                                <p>OR:</p>
                                <p onClick={()=>navigate(`/profile/avatarbot/${userId}`)} id="avatarbot">Avatar bot</p>
                                
                               
                            </label>
                            <input type="submit" value="updated profile" id="btn" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile