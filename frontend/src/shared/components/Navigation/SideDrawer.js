//Side Drawer for Mobile Hamburger Button

import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  //CSSTransition is used for animating the closing and opening
  {/*in attribute in CSSTransition takes boolean -> If false then component will not appear if true it will */}
  
  const content = (
    <CSSTransition
      in={props.show}  
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
    
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
  //Portal used above helps in rendering the content in a different place from the existing component tree
};

export default SideDrawer;
