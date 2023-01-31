import './message.css'

function Message({own}) {
    return (
        <div className={own? "message own": "message"}>
            <div className="messageTop">
                <img className='messageImg' src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" alt="" />
                <p className='messageText'>Hello this is a message</p>
            </div>
            <div className="messageBottom">
                1 hour ago

            </div>
        </div>
    )
}

export default Message