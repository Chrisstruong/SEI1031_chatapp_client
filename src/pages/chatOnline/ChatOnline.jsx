import React from "react";
import './chatOnline.css'

function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" alt="" />
                    <div className="chatOnlineBadge">
                    </div>
                </div>
                <span className="chatOnlineName">TrietTruong</span>

            </div>
        </div>
    )
}

export default ChatOnline