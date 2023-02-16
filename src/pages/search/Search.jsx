import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"
import './search.css'


function Search({ ID }) {
    const [searchValue, setSearchValue] = useState('')
    const [conversation, setConversation] = useState([])
    const [users, setUsers] = useState('')
    const [receiverIds, setReceiverIds] = useState('')
    const [display, setDisplay] = useState(true)
    const URL = 'https://chatapp-server.herokuapp.com/auth'

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
            const response = await fetch(`https://chatapp-server.herokuapp.com/conversations/${ID}`)
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
        if (e.target.value.length > 0){
            setDisplay(true)
        } else {
            setDisplay(false)
        }
        setSearchValue(e.target.value)
    }

    const onSearch = (searchItem) => {
        setSearchValue(searchItem)
    }

    // setTimeout(() => {
    //     SetDisplay(true)
    //   }, 1000);

    return (
        <div className='search-context'>
            <div className='search-context-inner'>
                <input type="text" value={searchValue} onChange={onChange} onClick={()=>setDisplay(false)}  id="search" autoComplete="off" placeholder='Add new friend...' />
            </div>
            <div className='drop-down-list'>
                {display?Object.values(users).filter((user) => {
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


                :
                <div className='drop-down-row'>
                    <button onClick={()=>setDisplay(true)} id="btn2">X</button>

                    <Link style={{textDecoration: 'none'}} key="63e07241a1d2dc9f7bc4d04d" to={`/profile/TRIETTRUONG/63e07241a1d2dc9f7bc4d04d/${ID}`}>
                        <div className='drop-down-info'>
                            <img id="search-image" style={{borderRadius: '10px'}} src="https://api.multiavatar.com/458.png" alt=""/>
                            <div>
                                <div id="search-title" style={{textDecoration: 'none'}}>TRIET TRUONG</div>
                            </div>
                        </div>
                    </Link>

                    <Link style={{textDecoration: 'none'}} key="63e10a75a1d2dc9f7bc4d1a4" to={`/profile/zachSykes/63e10a75a1d2dc9f7bc4d1a4/${ID}`}>
                        <div className='drop-down-info'>
                            <img id="search-image" style={{borderRadius: '10px'}} src="https://api.multiavatar.com/141.png" alt=""/>
                            <div>
                                <div id="search-title" style={{textDecoration: 'none'}}>zachSykes</div>
                            </div>
                        </div>
                    </Link>

                    <Link style={{textDecoration: 'none'}} key="63e115caa1d2dc9f7bc4d3dd" to={`/profile/JohnGoodrich/63e115caa1d2dc9f7bc4d3dd/${ID}`}>
                        <div className='drop-down-info'>
                            <img id="search-image" style={{borderRadius: '10px'}} src="https://api.multiavatar.com/118.png" alt=""/>
                            <div>
                                <div id="search-title" style={{textDecoration: 'none'}}>JohnGoodrich</div>
                            </div>
                        </div>
                    </Link>
                </div>
                
                }

            </div>
        </div>
    )
}

export default Search