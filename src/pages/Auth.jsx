// src/pages/Auth.jsx
import { getUserToken, setUserToken, clearUserToken, getUserId, setUserId } from "../utils/authToken"
import { useContext, useState } from "react"
import { UserContext } from "../data"
import RegisterForm from "../components/RegisterForm"
import LoginForm from '../components/LoginForm'
import { Link } from "react-router-dom"
import './login/loginPage.css'



function Auth(props){
    const  {setAuth, setUser} = useContext(UserContext)

    const registerUser = async (data) => {
        try {
    
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
    
            const newUser = await fetch(
                "https://chatapp-server.herokuapp.com/auth/register",
                configs
            )
    
            const parsedUser = await newUser.json()
            // console.log(parsedUser.user._id)
    
            // sets local storage
            setUserToken(parsedUser.token)
            // put the returned user object in state
            setUser(parsedUser.user)
            // adds a boolean cast of the responses isAuthenticated prop
            setAuth(parsedUser.isLoggedIn)
            //get id from the current user when register
            setUserId(parsedUser.user._id)
    
            // alternative (safer) implementation would be to use jwt decode library - <https://www.npmjs.com/package/jwt-decode>
            // this would also require reconfiguring our backend so we only send tokens with a signup
    
            return parsedUser
        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
        }
    }
        
    
    return (
        <div className="container">
            <div className="GA-sei1031">
                <div className="GA-header">
                    <img src="https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/2/original/CMYK-Red_Small_GeneralAssembly-Cog__1_.png" id="GA-image" alt="GA" />
                    <h1 id="SEI1031">SEI1031_GRADUATES</h1>
                </div>
            <h1 data-text="Register" id="Register2">Register...</h1>
            <RegisterForm signUp={registerUser}/>
            <div className="Link-to-register">
                    <p>ALREADY A BEAUTIFUL FAM? <span ><Link to='/'id="Register" >LOGIN</Link></span></p>
                </div>
            </div>
        </div>
    )
}

export default Auth