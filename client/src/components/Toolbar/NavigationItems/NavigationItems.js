import React from "react";
import Styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
//import Logo from "../../Logo/Logo";

const navigationItems = (props) => (
  <div
    className={Styles.NavigationItems}
    style={props.showNav ? { display: "none" } : null}
  >
    <NavigationItem link="/detect" exact>
      DETECT
    </NavigationItem>
    <NavigationItem link="/covid" exact>
      COVID
    </NavigationItem>
    <NavigationItem link="/" exact>
      HOME
    </NavigationItem>
  </div>
);

export default navigationItems;
