import React, { useState } from "react";
import Chatprofile from "./Chatprofile";

export default function Chat(props) {

    function setactivechat() {
        if (props.type === "chat"){
            props.setActiveChat(props.username);
            if (window.innerWidth <= 767) {
                document.querySelector(".Chat-list").style.display = "none";
                document.querySelector(".Chat-container").style.display = "block";
            }
        }
    }

    return (
        <div className="Chat" onClick={ setactivechat }>
            <div className="Chat-item">
                <div className="chat-profile">
                    <Chatprofile img={props.img}/>
                </div>
                <div className="chat-content">
                    <p id="username" style={
                        {
                            cursor:'pointer'
                        }
                    }>{props.username}</p>
                    {props.extra}
                </div>
            </div>
        </div>
    );
}