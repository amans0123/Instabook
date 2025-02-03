import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

const Backdrop = (props) => {
  const background = <div className="backdrop" onClick={props.onClick}></div>;
  //This background is rendered at different position using React Portal in index.html file

  return ReactDOM.createPortal(
    background,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
