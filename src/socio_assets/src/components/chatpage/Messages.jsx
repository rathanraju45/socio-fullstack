import React from "react";
import messages from "../../messages";

export default function Messages(){
    return (
        <div className="Messages">
            {
                messages.map(message => 
                        <p key={message.id} style={
                            {
                                alignSelf: message.align === 'left' ? 'flex-end' : 'flex-start',
                                backgroundImage : message.align === 'left' ? 'var(--message-background-right)' : 'var(--message-background)'
                            }
                        }>{message.message}</p>
                )
            }
        </div>
    )
}