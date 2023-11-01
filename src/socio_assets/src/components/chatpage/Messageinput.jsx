import React from "react";
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MicIcon from '@mui/icons-material/Mic';

export default function Messageinput(props){
    return (
        <div className="Message-input" id={props.inputType}>
            <input type="text" placeholder={props.placeholder} id={props.id}/>
            <div className="Input-icons" style={
                {
                    display: props.inputType === 'search' ? 'none' : 'inline-flex'
                }
            }>
                <AttachmentIcon sx={{color: "fdfdfd", fontSize:"1.8vw"}}/>
                <MicIcon sx={{color: "fdfdfd", fontSize:"1.8vw"}}/>
                <SendIcon sx={{color: "fdfdfd", fontSize:"1.8vw"}}/>
            </div>
        </div>
    )
}