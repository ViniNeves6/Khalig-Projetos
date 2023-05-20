import React from 'react';

import { ChatEngine } from 'react-chat-engine';

const SupportAdmin = () => {
    return (
        <ChatEngine
            projectID={process.env.REACT_APP_CE_PROJECT_ID}
            userName='Funcionário'
            userSecret='khalibras'
            height='calc(100vh - 17px)'
        />
    )
}

export default SupportAdmin