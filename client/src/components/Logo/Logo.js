import React from "react";
import Styles from "./Logo.module.css";

const logo = () => {
  return (
    <div className={Styles.Logo}>
      <img src={require("./images/logo2.png")} alt="event-Registration"></img>
    </div>
  );
};

export default logo;
