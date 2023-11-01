import React from "react";

export default function Messageheader(props){
    return (
        <div className="Message-header">
            <img src={props.img} alt="profile" style={
                {
                    width:'3.5vw',
                    height:'3.5vw',
                    border:'solid 2px red',
                    borderRadius:'50%'
                }
            }/>
            <p>{props.username}</p>
        </div>
    )
}