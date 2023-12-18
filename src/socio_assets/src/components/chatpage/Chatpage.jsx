import React from "react";
import Header from "../global/Header"
import Body from "./Body"

export default function Chatpage(props) {
    
    return(
        <div className="Main-container">
            <Header userName={ props.user } />
            <Body userName={ props.user } />
        </div>
    );
}