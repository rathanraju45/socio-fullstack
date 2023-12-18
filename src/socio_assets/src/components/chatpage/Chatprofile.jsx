import React, { useEffect, useState } from "react";
import { socio } from "../../../../declarations/socio/index"
import default_profile from '../../images/default_profile.jpg'

export default function Chatprofile(props) {

    const [src, setSrc] = useState("");
    
    useEffect(() => {
        async function fetchData() {
            try {
                let userPic = await socio.getDP(props.img);
                let tempsrc = (userPic === "nil" ? default_profile : userPic);
                setSrc(tempsrc);
            } catch (error) {
                console.error("Error fetching user pic:", error);
                setSrc(default_profile);
            }
        }

        fetchData();
    },[props.img])

    return (
        <div>
            <img src={src}
             alt="profile" style={
                {
                    width:"3.5vw",
                    height:"3.5vw",
                    border: 'solid 2px red',
                    borderRadius:"50%"
                }
            }/>
        </div>
    )
}
