import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MicIcon from '@mui/icons-material/Mic';
import { socio } from "../../../../declarations/socio/index";
import { v4 as uuidv4 } from 'uuid';

export default function Messageinput(props) {
    
    const [inputValue, setInputValue] = useState("");

    async function submit() {
        if (inputValue !== "") {

            let inputMessage = {
                id: uuidv4(),
                message: inputValue,
                sender: props.sender
            }

            // props.setMessagesList([
            //     inputMessage,
            //     ...props.messagesList
            // ]);
            setInputValue("");

            // Using Promise.all to wait for both promises to resolve
            let [bond1, bond2] = await Promise.all([
                socio.getUserID(props.activeChat),
                socio.getUserID(props.sender)
            ]);

            let bondName1 = bond1 + bond2;
            let bondName2 = bond2 + bond1;

            let sendResult = await socio.addMessage(bondName1, bondName2, inputMessage);
            console.log(sendResult)
        }
    }


    function submitOnEnter(event) {
        if (event.key === 'Enter') {
            submit();
        }
    }

    return (
        <div className="Message-input" id={props.inputType}>
            <input type="text" placeholder={props.placeholder} value={inputValue} onChange={(event) => setInputValue(event.target.value)}name="newMessage" onKeyDown={submitOnEnter}/>
            <div className="Input-icons" style={
                {
                    display: props.inputType === 'search' ? 'none' : 'inline-flex'
                }
            }>
                <AttachmentIcon sx={{color: "fdfdfd", fontSize:"1.8vw"}}/>
                <MicIcon sx={{color: "fdfdfd", fontSize:"1.8vw"}}/>
                <div className="sendButton" onClick={ submit } tabIndex="0"><SendIcon sx={{ color: "fdfdfd", fontSize: "1.8vw" }} /></div>
            </div>
        </div>
    )
}