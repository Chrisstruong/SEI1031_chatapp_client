import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserToken } from '../utils/authToken'
import './avatar.css'



function SetAvatar(props) {
    const token = getUserToken()
    const [avatar, setAvatar] = useState(null)
    const [member, setMember] = useState([])
    const [defaults, setDefault] = useState(true)
    const params = useParams()
    const { userId } = params
    const navigate = useNavigate()
    const avatarArray = []
    let randomNum2 = 0
    for (let i = 0; i < 5; i++) {
        let randomNum = Math.floor(Math.random() * 500)
        randomNum2 = randomNum
        if (randomNum2 === randomNum) {
            randomNum = Math.floor(Math.random() * 500)
        }
        avatarArray.push(`https://api.multiavatar.com/${randomNum}.png`)
    }

    const getMember = async () => {
        try {
            const response = await fetch(`http://localhost:4000/auth/${userId}`)
            const foundMember = await response.json()
            setMember(foundMember)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMember()
    }, [])


    const updatedMember = async (e) => {
        e.preventDefault()
        console.log("hello")
        const newMember = {
            _id: userId,
            username: member.username,
            avatarImage: avatar
        }
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newMember)
            }
            const response = await fetch(`http://localhost:4000/auth/${userId}`, requestOptions)
            const updatedMember = await response.json()
            setMember(updatedMember)
            navigate(`/messenger/${userId}`)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='avatar-container'>
            <div className='block'></div>
            <div className='sub-container'>
                <h1 id="h1-avatar">Pick an avatar as your profile picture</h1>
                <div className='Image-container'>
                    {avatarArray.map((ava) => (
                        <img src={ava} alt="" onClick={(e) => { e.preventDefault(); setAvatar(ava); setDefault(false) }} className='ava' />
                    ))}
                </div>
                <div className='default-container'>
                    {defaults ?
                        <div className='defaults'>
                            <p className='default-text'>Default:</p>
                            <img id="defaults1" src="https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg" alt="" />
                        </div>
                        :
                        <div className='defaults'>
                            <p className='default-text'>Current Choice:</p>
                            <img id="defaults2" src={avatar} alt="" />
                        </div>
                    }
                    <button onClick={updatedMember} id="button">SET AS PROFILE PICTURE</button>
                </div>
            </div>

        </div>
    )
}

export default SetAvatar