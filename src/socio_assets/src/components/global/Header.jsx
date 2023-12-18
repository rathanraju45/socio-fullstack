import React, { useState, useEffect } from "react";
import Socio from "../../images/socio_transparent.png";
import defaultPic from "../../images/default_profile.jpg";
import { socio } from "../../../../declarations/socio/index";

export default function Header(props) {
    const [profileSrc, setProfileSrc] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                let userPic = await socio.getDP(props.userName);
                let src = (userPic === "nil" ? defaultPic : userPic);
                setProfileSrc(src);
            } catch (error) {
                console.error("Error fetching user pic:", error);
                setProfileSrc(defaultPic);
            }
        }

        fetchData();
    }, [props.userName]); // Re-run the effect when props.userName changes

    return (
        <div className="Header">
            <img src={Socio} alt="socio-logo" id="logo" />
            <div className="profile">
                {profileSrc && (
                    <img
                        src={profileSrc}
                        alt="profile"
                        style={{
                            width: "3.5vw",
                            height: "3.5vw",
                            border: "solid 2px red",
                            borderRadius: "50%",
                        }}
                    />
                )}
            </div>
        </div>
    );
}
