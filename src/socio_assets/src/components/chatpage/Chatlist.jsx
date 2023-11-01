import React from "react";
import Chatheader from "./Chatheader";
import Chat from "./Chat";
import profiles from "../../profiles";
import Messageinput from "./Messageinput";

export default function Chatlist(){
    return (
        <div className="Chat-list" >
            <Chatheader />
            <Messageinput placeholder="Search chats" id="chat-search-bar" inputType="search"/>
            <div className="Chats">
                {
                    profiles.map(element => 

                        <Chat img={element.profilepic} username={element.username} key={element.id}/>

                    )
                }
            </div>
        </div>
    );
}