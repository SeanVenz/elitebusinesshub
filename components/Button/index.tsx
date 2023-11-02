import React from "react";
import './index.scss'

function MainButton({ onClick, text, disabled }: any) {
  return (
    <div className="main-button">
      <button
        onClick={onClick}
        disabled={disabled}
      >
        <span className="text">{text}</span>
      </button>
    </div>
  );
}

export default MainButton;
