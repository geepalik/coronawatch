import React from "react";
import ReactDOM from 'react-dom';
import './Modal.css';

const modal = props => ReactDOM.createPortal(
    <div className="modal">
        <header className="modal_header">
            <h1>{props.title}</h1>
        </header>
        <div className="modal_content">{props.children}</div>
        <div className="modal_actions">
            <div className="modal_close" onClick={props.onCloselModal}>Close</div>
        </div>
    </div>,
    document.getElementById('modal-root')
);

export default modal;