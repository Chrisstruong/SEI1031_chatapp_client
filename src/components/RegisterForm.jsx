import {useNavigate} from 'react-router-dom';
import {useState} from 'react';


const RegisterForm = ({signUp}) => {
  
	const initialState = { username: "", password: ""}
  const [input, setInput] = useState(initialState)
	const navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const createdUserToken = await signUp(input)

    if (createdUserToken) {
      navigate(`/register/setAvatar/${createdUserToken.user._id}`)
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
      {/* <h1>Register</h1> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Name: </label>
        <input
          id="username"
          name="username"
          placeholder='username'
          value={input.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          placeholder='password'
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Create User" id="log-in-user"/>
      </form>
    </div>
  );
};

export default RegisterForm