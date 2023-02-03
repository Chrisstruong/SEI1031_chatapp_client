import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"
import './search.css'


function Search({ ID }) {
    const [searchValue, setSearchValue] = useState('')
    const [conversation, setConversation] = useState([])
    const [users, setUsers] = useState('')
    const [receiverIds, setReceiverIds] = useState('')
    const URL = 'http://localhost:4000/auth'

    const getUsers = async () => {
        try {
            const response = await fetch(URL)
            const allUsers = await response.json()
            setUsers(allUsers)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])

    const getConversation = async () => {
        try {
            const response = await fetch(`http://localhost:4000/conversations/${ID}`)
            const foundConversation = await response.json()
            console.log(foundConversation)
            setConversation(foundConversation)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getConversation()
    }, [])

    const onChange = (e) => {
        setSearchValue(e.target.value)
    }
    // const onSearch = async (e) => {
    //     const newFriend = {
    //         senderId: ID,
    //         receiverId: receiverIds._id,
    //     }
    //     console.log(newFriend)
    //     try{
    //         const requestOptions = {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body:JSON.stringify(newFriend)
    //         }
    //         const response = await fetch('http://localhost:4000/conversations', requestOptions)
    //         const createdFriend = await response.json()
    //         setConversation([...conversation, createdFriend])
    //     } catch(err) {
    //         console.log(err)
    //     }
    //     // window.location.reload(false)
    // }

    const onSearch = (searchItem) => {
        setSearchValue(searchItem)
    }
    return (
        <div className='search-context'>
            <div className='search-context-inner'>
                <p id="look-up-symbol">{<BsSearch />}</p>
                <input type="text" value={searchValue} onChange={onChange} id="search" autoComplete="off" placeholder='Add new friend...' />
                <button onClick={onSearch}>Search</button>
            </div>
            <div className='drop-down-list'>
                {Object.values(users).filter((user) => {
                    const searchItem = searchValue.toLowerCase()
                    const userName2 = user.username.toLowerCase()
                    return (searchItem && userName2.startsWith(searchItem) && userName2 !== searchItem)
                }).slice(0, 8)
                    .map((user, idx) => (
                        <div className='drop-down-row' onClick={() => onSearch(user)} key={idx}>
                            <Link style={{textDecoration:'none'}} key={user._id} to={`/profile/${user.username.slice(0,5)}/${user._id}/${ID}`}>
                                <div className='drop-down-info' >
                                    <img id="search-image" style={{ borderRadius: '10px' }} src={user.avatarImage} alt="" />
                                    <div>
                                        <div id="search-title" style={{ textDecoration: 'none' }}>{user.username}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))


                }

            </div>
        </div>
    )
}

export default Search