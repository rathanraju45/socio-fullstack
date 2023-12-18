import React, { useState, useEffect} from "react";
import Messages from "./Messages";
import Messageheader from "./Messageheader";
import Messageinput from "./Messageinput";
import default_profile from "../../images/default_profile.jpg";
import { socio } from "../../../../declarations/socio/index";

export default function Chatcontainer(props) {

    function isMobileDevice() {
        return window.innerWidth <= 767;
    }

    function backClicked() {
        if (isMobileDevice) {
            document.querySelector(".Chat-container").style.display = "none";
            document.querySelector(".Chat-list").style.display = "block";
        }
    }

    const [src, setSrc] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                let userPic = await socio.getDP(props.activeChat);
                let tempsrc = (userPic === "nil" ? default_profile : userPic);
                setSrc(tempsrc);
            } catch (error) {
                console.error("Error fetching user pic:", error);
                setSrc(default_profile);
            }
        }

        fetchData();
    }, [props.activeChat])
    
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {

        async function fetchMessages() {

            let [bond1, bond2] = await Promise.all([
                socio.getUserID(props.activeChat),
                socio.getUserID(props.sender)
            ]);

            let bondName1 = bond1 + bond2;
            let bondName2 = bond2 + bond1;

            const userMessages = await socio.getMessages(bondName1, bondName2);
            setMessagesList(userMessages);
        }

        fetchMessages();
    }, [props.activeChat, props.sender,messagesList]);

    return (
        <>
            {
                props.activeChat === "none"
                ? 
                    (
                        <div className="Chat-container">
                            <p style={
                                {
                                    margin: 'auto',
                                    fontSize:'2vw'
                                }
                            }>Select a chat to View messages</p>
                        </div>
                    )
                :
                    (<div className="Chat-container">
                        <Messageheader img={src} username={props.activeChat} setClicked={ backClicked } />
                        <div className="Messages-container">
                            <Messages Messages={messagesList} activeChat={props.activeChat} />
                        </div>
                        <Messageinput placeholder="Enter your message..." messagesList={messagesList} setMessagesList={setMessagesList} sender={props.sender} activeChat={props.activeChat} />
                    </div>)
            }
        </>
    )
}