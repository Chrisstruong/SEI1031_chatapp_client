import { getUserToken, setUserToken, clearUserToken, getUserId, setUserId } from "../utils/authToken"
import { useContext, useState } from "react"
import { UserContext } from "../data"
import { Link } from "react-router-dom"
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"
import './login/loginPage.css'

function LoginPage() {
    const { setAuth, setUser } = useContext(UserContext)

    // Code Sample part 1 STARTS
    const loginUser = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const response = await fetch(
                "https://chatapp-server.herokuapp.com/auth/login",
                configs
            )

            const currentUser = await response.json()
            if (currentUser.token) {
                // sets local storage
                setUserToken(currentUser.token)
                // put the returned user object in state
                setUser(currentUser.user)
                setAuth(currentUser.isLoggedIn)
                //get id from the current user when register
                setUserId(currentUser.user._id)

                return currentUser
            } else {
                throw `Server Error: ${currentUser.statusText}`
            }
        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
        }
    }
    // END part 1

    return (
        <div className="container">
            <div className="GA-sei1031">
                <div className="GA-header">
                    <img src="https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/2/original/CMYK-Red_Small_GeneralAssembly-Cog__1_.png" id="GA-image" alt="GA" />
                    <h1 id="SEI1031">SEI1031_GRADUATES</h1>
                </div>

                {/*Code Sample part 2 STARTS  */}
                <LoginForm signIn={loginUser} />
                {/*End part 2  */}
                
                <div className="Link-to-register">
                    <p>LET'S BECOME SEI1031 FAM! <span ><Link to='/register'id="Register" >REGISTER</Link></span></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage