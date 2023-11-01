import React, { useState } from "react";
import Sidenav from "../global/Sidenav";
import Chatlist from "./Chatlist";
import Chatcontainer from "./Chatcontainer";

export default function Body(){

    const [hovered, setHovered] = useState(false);

    function MouseHovered(){
        setHovered(true);
    }

    function MouseLeft(){
        setHovered(false);
    }

    return (
        <div className="Body">
            <Sidenav onMouseEnter={MouseHovered} onMouseLeave={MouseLeft} width={hovered ? '10%' : '3%'} hovered={hovered} page="Chat" />
            <Chatlist />
            <Chatcontainer />
        </div>
    )
}