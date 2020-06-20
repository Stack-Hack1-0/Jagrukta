import React from "react";
import Styles from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = props => (
  <div className={Styles.NavigationItem} onMouseEnter={e => {}}>
    <NavLink
      to={props.link}
      activeClassName={Styles.active}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </div>
);

export default navigationItem;
