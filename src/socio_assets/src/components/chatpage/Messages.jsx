import React,{ useEffect, useRef } from "react";

export default function Messages(props) {

    let user = props.activeChat;

    const lastMessageRef = useRef(null);

    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            lastMessageRef.current.scrollIntoView({ behaviour: 'auto' });
            firstRender.current = false;
            return;
        }
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behaviour: 'smooth' });
        }
    }, [props.Messages])

    return (
        <div className="Messages">
            <div ref={lastMessageRef}></div>
            {
                props.Messages.map(message => 
                        <p key={message.id} style={
                            {
                                alignSelf: message.sender === user ? 'flex-start' : 'flex-end',
                                backgroundImage : message.sender === user ? 'var(--message-background-right)' : 'var(--message-background)'
                            }
                        }>{message.message}</p>
                )
                
            }
        </div>
    )
}