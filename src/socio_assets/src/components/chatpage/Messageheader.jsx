import React from "react";
import default_profile from "../../images/default_profile.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Messageheader(props){
    return (
        <div className="Message-header">
            <div id="back-icon" onClick={props.setClicked}>
                <ArrowBackIcon sx={{ color: "#fdfdfd", fontSize:"1.8vw" }} />
            </div>
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