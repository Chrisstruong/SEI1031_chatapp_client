import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
// import '../pages/login/loginPage.css'


const LoginForm = ({signIn}) => {
  
	const initialState = { username: "", password: ""}
  const [input, setInput] = useState(initialState)
	const navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const createdUserToken = await signIn(input)

    if (createdUserToken) {
      navigate(`/messenger/${createdUserToken.user._id}`)
    } else {
      navigate("/")
    }
		setInput(initialState);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className='login-form-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Name: </label>
        <input
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Log In" id="log-in-user" />
      </form>
    </div>
  );
};

export default LoginForm