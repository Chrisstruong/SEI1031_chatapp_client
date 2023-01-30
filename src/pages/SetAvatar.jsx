import React from 'react'
import {useState, useEffect} from 'react'
function SetAvatar(props) {
    const [avatar, setAvatar] = useState("")
    let randomNum  = Math.floor(Math.random()*100000)
    const BASE_URL = `https://api.multiavatar.com/${randomNum}.png`

    return(
        <div>
            <h1>hello</h1>
            <img src={BASE_URL} alt=""/>
            <img src={BASE_URL} alt=""/>
        </div>
    )
}

export default SetAvatar