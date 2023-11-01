import React from "react";
import Chatprofile from "./Chatprofile";

export default function Chat(props){
    return (
        <div className="Chat">
            <div className="Chat-item">
                <div className="chat-profile">
                    <Chatprofile img={props.img}/>
                </div>
                <div className="chat-content">
                    <p id="username" >{props.username}</p>
                    <p id="chat-preview">Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
        </div>
    );
}