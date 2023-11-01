import React from "react";
import Messages from "./Messages";
import Messageheader from "./Messageheader";
import Messageinput from "./Messageinput";
import profiles from "../../profiles";

export default function Chatcontainer(){
    return (
        <div className="Chat-container">
            <Messageheader img={profiles[0].profilepic} username={profiles[0].username}/>
                <div className="Messages-container">
                        <Messages />
                </div>
            <Messageinput placeholder="Enter your message..."/>
        </div>
    )
}