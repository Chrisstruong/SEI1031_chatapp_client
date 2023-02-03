// check the local storage api
const getUserToken = () => {
    return localStorage.getItem('token')
}

// write a token value to the token field of localStorage
const setUserToken = (token) => {
    return localStorage.setItem('token', token)
}

// clear the token
const clearUserToken = () => {
  return localStorage.setItem('token', "")
}

const setUserId = (ID) => {
  return localStorage.setItem('id', ID)
}
const getUserId = () => {
  return localStorage.getItem('id')
}

export {getUserToken,setUserToken, clearUserToken, setUserId, getUserId}

