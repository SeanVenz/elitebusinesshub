import React from "react";
import "./index.scss";

function MainButton({ onClick, text, disabled }: any) {
  return (
    <div className="main-button">
      <button onClick={onClick} disabled={disabled}>
        <span className="text">{text}</span>
      </button>
    </div>
  );
}

function ButtonSkeleton() {
  return <button className="button-skeleton">&nbsp;</button>;
}

function SecondaryButton({ text }: any) {
  return (
    <div className="secondary-button">
      <button>
        <span className="circle1"></span>
        <span className="circle2"></span>
        <span className="circle3"></span>
        <span className="circle4"></span>
        <span className="circle5"></span>
        <span className="text">Submit</span>
      </button>
    </div>
  );
}

export { MainButton, ButtonSkeleton, SecondaryButton };
