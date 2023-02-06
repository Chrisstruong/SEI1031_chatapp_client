import React from "react";
import './chatOnline.css'

function ChatOnline({name, image}) {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={image} alt="" />
                    <div className="chatOnlineBadge">
                    </div>
                </div>
                <span className="chatOnlineName">{name}</span>

            </div>
        </div>
    )
}

export default ChatOnline