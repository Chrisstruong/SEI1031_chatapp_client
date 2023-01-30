import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components'
import GA from "../assets/GA.png"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { RegisterRoute } from '../utils/APIROUTES';

function Register(props) {
    const [values, setValues] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    })
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleValidation()) {
            const {password, confirmPassword, username} = values;
            const {data} = await axios.post(RegisterRoute, {
                username,
                password,
            })
        }

    }//submit the typed user's information
    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }//keep what user is typing
    const handleValidation = () => {
        const {password, confirmPassword, username} = values;
        if (password !== confirmPassword){
            toast.error("password and confirm password should be the same.",{
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            })
            return false
        } else if (username.length<5){
            toast.error("Username should be at least 5 letters",{
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            })
            return false
        } else if (password.length<5){
            toast.error("Password should be at least 5 letter",{
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            })
            return false
        } 
        return true
    }
    return (
        <>
        <FormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className='brand'>
                    <img src={GA} alt="GA" />
                    <h1>SEI1031_graduates</h1>
                </div>
                <input
                    type="username"
                    placeholder="Username"
                    name="username"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(e) => handleChange(e)}
                />
                <button type="submit">Create User</button>
                <span>
                    Already have an account?
                    <Link to="/login">Login</Link>
                </span>

            </form>
        </FormContainer>
        <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flext-direction: column
    justify-content:center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content:center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform:uppercase; //Use to uppercase all letters
        }
    }
    form{
        display: flex;
        flex-direction:column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1 rem solid #4e0eff;
            border-radius: 0.4 rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: .1rem solid #997af0;
                outline: none

            }//:focus (when user click)
        }
    }
    button{
        background-color: #997af0;
        color:white;
        padding: 1rem 2rem;
        border: none
        font-weight: bold;
        cursor: poiner;
        border-radius:0.4rem;
        font-size: 1rem;
        text-tranformation: uppercase;
        transition: 0.5s ease-in-out
        &:hover{
            background-color: #4e0eff;
        }
    }
    span{
        color:white;
        text-transform: uppercase;
        a {
            color: #4e0eff;
            text-decoration:none;
            font-weight:bold;
        }
    }
`;

export default Register