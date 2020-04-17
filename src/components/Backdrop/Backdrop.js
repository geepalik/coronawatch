import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const backdrop = props =>
    ReactDOM.createPortal(
        <div
            className="backdrop"
            onClick={props.onClick}
        />,
        document.getElementById('backdrop-root')
    );

export default backdrop;