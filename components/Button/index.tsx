import React from "react";
import './index.scss'

function MainButton({ onClick, text }: any) {
  return (
    <div className="main-button">
      <button
        onClick={onClick}
      >
        <span className="text">{text}</span>
      </button>
    </div>
  );
}

export default MainButton;
