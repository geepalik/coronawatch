import React from "react";
import ReactDOM from 'react-dom';
import './Modal.css';

const modal = props => ReactDOM.createPortal(
    <div className={props.modalClassName}>
        <header className="modal_header">
            <div className="modal_actions">
                <div className="modal_close" onClick={props.onCloseModal}>X</div>
            </div>
        </header>
        <div className="modal_content">{props.children}</div>
    </div>,
    document.getElementById('modal-root')
);

export default modal;