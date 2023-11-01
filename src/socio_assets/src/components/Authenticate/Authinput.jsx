import React from "react";

export default function Authinput(props){
    return (
        <input type={props.type} placeholder={props.placeholder} id={props.type} style={
            {
                display : props.placeholder === 'Confirm your Password' && props.tab === 'login' ? 'none' : 'block'
            }
        }/>
    );
}