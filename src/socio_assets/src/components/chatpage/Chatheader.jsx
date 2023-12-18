import React, { useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export default function Chatheader(props) {

    const [header, setHeader] = useState("Chats");

    function explore() {
        props.exploreArea("explore");
        setHeader("Add friends");
        props.inputFunction("");
    };

    function chat() {
        props.exploreArea("chat");
        setHeader("Chats");
        props.inputFunction("");
    };

    return (
        <div className="Chat-header" style={ { diplay : 'flex',justifyContent:'space-between',alignItems:'center' }}>
            <p>{ header }</p>
            <div className="buttons" style={ { display:'flex' }}>
                <div onClick={explore} style={
                    {
                        backgroundColor: header === "Add friends" ? '#fdfdfd' : '#060608',
                        width: '2vw',
                        height: '2vw',
                        borderRadius: '5px'
                    }
                }>
                    <PersonAddIcon sx={{ color: header === "Add friends" ? '#060608' : '#fdfdfd', fontSize: "2vw" }} />
                </div>
                <div onClick={chat} style={ 
                    {
                        backgroundColor: header === "Chats" ? '#fdfdfd' : '#060608',
                        width: '2vw',
                        height: '2vw',
                        marginLeft: '20px',
                        borderRadius: '5px'
                    }
                }>
                    <ChatBubbleIcon sx={{ color: header === "Chats" ? '#060608' : '#fdfdfd', fontSize: "2vw" }} />
                </div>
            </div>
        </div>
    )
}