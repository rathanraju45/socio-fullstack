import React from "react";
import Icon from "../chatpage/Icon";

export default function Sidenav(props){

    const isHovered = props.hovered;
    const display = isHovered ? 'block' : 'none';

    return (
        <div className="Side-nav" onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
            <Icon icon={props.page === "Home" ? "Home" : "Homeoutlined"}  display={display} iconName="Home"/>
            <Icon icon="Search" display={display} iconName="Search"/>
            <Icon icon={props.page === "Explore" ? "Explore" : "Exploreoutlined"} display={display} iconName="Explore"/>
            <Icon icon={props.page === "Chat" ? "Chat" : "Chatoutlined"} display={display} iconName="Chat"/>
            <div className="customise">
                <Icon icon="Colors" display={display} iconName="Colors"/>
            </div>
        </div>
    )
}