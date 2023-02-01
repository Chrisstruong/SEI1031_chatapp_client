import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
function FakeAuthentication(props) {
    const [input, setInput] = useState("")
    const navigate = useNavigate()
   
   const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/messenger/${input}`)
   }
    return (
        <>
            <h1>"LOGIN"</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter your username:
                    <input 
                    type="text"
                    value={input}
                    onChange={(e)=> setInput(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
            
        </>
    )
}

export default FakeAuthentication