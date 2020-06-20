import React from "react";
import Toolbar from "../Toolbar/Toolbar";

const Layout = (props) => {
  return (
    <div>
      <Toolbar />
      {props.children}
    </div>
  );
};

export default Layout;
