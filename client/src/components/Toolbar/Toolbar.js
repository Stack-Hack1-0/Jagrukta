import React from "react";
import Styles from "./Toolbar.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";
import NavigationItem from "./NavigationItems/NavigationItem/NavigationItem";
import Logo from "../Logo/Logo";

const Toolbar = (props) => {
  return (
    <header className={Styles.Toolbar}>
      <nav>
        <NavigationItem link="/">
          <Logo />
        </NavigationItem>
      </nav>
      <nav>
        <NavigationItems showNav={props.show} />
      </nav>
    </header>
  );
};

export default Toolbar;
// style={
// props.isAdmin
// ? { backgroundColor: "dimgray" }
// : { backgroundColor: "tranparent" }
// }
