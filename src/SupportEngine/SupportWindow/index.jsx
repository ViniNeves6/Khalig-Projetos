import React, { useState } from 'react';

import EmailForm from './EmailForm';
import ChatEngine from './ChatEngine';


const SupportWindow = props => {
    const [user, setUser] = useState(null);
    const [chat, setChat] = useState(null);


    return (
        <div>
            <EmailForm
                setUser={user => setUser(user)}
                setChat={chat => setChat(chat)}
                visible={user === null || chat === null}
            />

            <ChatEngine
                visible={user !== null && chat !== null}
                chat={chat}
                user={user}
            />
        </div>
    )
}

export default SupportWindow