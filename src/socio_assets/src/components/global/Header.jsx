import React from "react";
import socio from "../../images/socio_transparent.png"
import rathanraju from "../../images/rathan_raju.jpg"

export default function Header(){
    return (
        <div className="Header">
            <img src={socio} alt="socio-logo" id="logo"/>
            <div className="profile">
                <img src={rathanraju} alt="profile" style={
                    {
                        width: '3.5vw',
                        height: '3.5vw',
                        border: 'solid 2px red',
                        borderRadius: '50%'
                    }
                }/>
            </div>
        </div>
    )
}