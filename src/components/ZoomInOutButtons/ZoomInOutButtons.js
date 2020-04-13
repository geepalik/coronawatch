import React from "react";
import './ZoomInOutButtons.css';

const ZoomInOutButtons = ({handleZoomIn, handleZoomOut}) => {
    return (
        <div className="controls">
            <button onClick={handleZoomIn}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
            <button onClick={handleZoomOut}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                >
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
        </div>
    );
};

export default ZoomInOutButtons;