import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './reset.css';

import SupportWindow from './SupportEngine/SupportWindow';
import SupportAdmin from './SupportAdmin';
import VLibras from "@djpfs/react-vlibras";

const path = window.location.pathname

ReactDOM.render(
    <React.StrictMode>
        <VLibras />
        { path.indexOf('/support') === -1 ? <SupportWindow /> : <SupportAdmin /> }
    </React.StrictMode>,
    document.getElementById('root')
);