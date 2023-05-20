import React, { useState, useEffect } from "react";

import {ChatEngineWrapper, Socket, ChatFeed} from 'react-chat-engine';
import { styles } from "../styles";

const ChatEngine = props => {
    const [showChat, setShowChat] = useState(false)

    useEffect(() => {
        if (props.visible) {
            setTimeout(() => {
                setShowChat(true)
            }, 500)
        }
    })

    return (
        <div
            className='transition-5'
            style={{
                ...styles.chatEngineWindow,
                ...{
                    margin: '0',
                    padding: '0',
                    height: props.visible ? 'calc(100vh - 17px)' : '0px',
                    zIndex: props.visible ? '100' : '0',
                    width: 'auto',
                    backgroundColor: 'white',
                }
            }}

        >
            {
                showChat &&
                <ChatEngineWrapper>
                    <Socket
                        projectID={process.env.REACT_APP_CE_PROJECT_ID}
                        userName={props.user.email}
                        userSecret={props.user.email}
                    />
                    <ChatFeed activeChat={props.chat.id} />

                </ChatEngineWrapper>
            }

        </div>
    )
}

export default ChatEngine