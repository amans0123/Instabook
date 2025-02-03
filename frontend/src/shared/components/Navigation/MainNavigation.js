//Main Navigation Bar Logic here

import React,{useState} from "react";

import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";

const MainNavigation = () => {
  const [drawerIsOpen,setDrawerIsOpen]=useState(false);

  //Function to Set Drawer is Open when button is clicked
  const openDrawerHandler = () =>{
    setDrawerIsOpen(true);
  };

  //Function to close the Side Drawer when background is clicked on
  const closeDrawerHandler =()=>{
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {/*React Fragment is used to return 2 elements */}

      {/* First element is Side Drawer */}

      {/*If Background is Clicked on Then Sidedrawer will close */}
      {drawerIsOpen? (<Backdrop onClick={closeDrawerHandler}/>):null};

      {/*SideDrawer has CSSTransition whichc shows or hides sideDrawer based on state sent by show prop given below */}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      {/* Second element is Main Header */}

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          {/*3 spans are used to make a hamburger button */}
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">InstaBook</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
