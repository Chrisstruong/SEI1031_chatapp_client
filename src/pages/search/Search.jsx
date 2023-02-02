import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"
import './search.css'




function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [users, setUsers] = useState('')
    const URL = 'http://localhost:4000/member'

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

    const onChange = (e) => {
        setSearchValue(e.target.value)
    }
    const onSearch = (searchItem) => {
        setSearchValue(searchItem)
    }
    return (
        <div className='search-context'>
            <div className='search-context-inner'>
                <p id="look-up-symbol">{<BsSearch />}</p>
                <input type="text" value={searchValue} onChange={onChange} id="search" autoComplete="off" placeholder='Search name of SEI1031 members...' />
                <button onClick={onSearch}>Search</button>
            </div>
            <div className='drop-down-list'>
                {Object.values(users).filter((user) => {
                    const searchItem = searchValue.toLowerCase()
                    const userName2 = user.username.toLowerCase()
                    return (searchItem && userName2.startsWith(searchItem) && userName2 !== searchItem)
                }).slice(0, 8)
                    .map((user, idx) => (
                        <div onClick={() => onSearch(user)} className='drop-down-row' key={idx}>
                            <div className='drop-down-info'>
                                <img id="search-image" style={{ borderRadius: '10px' }} src={user.avatarImage} alt="" />
                                <div>
                                    <div id="search-title" style={{ textDecoration: 'none' }}>{user.username}</div>
                                </div>
                            </div>
                        </div>
                    ))


                }

            </div>
        </div>
    )
}

export default Search