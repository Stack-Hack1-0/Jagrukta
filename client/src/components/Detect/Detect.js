import React, { useState, useEffect } from "react";
import Button from "../Button/Button";

const Detect = (props) => {
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h2 style={{ color: "white" }}>Check news</h2>
      <textarea
        autoFocus
        style={{ padding: "5px", border: "grey solid 1px" }}
        id="input"
        name="input"
        rows="10"
        cols="80"
      ></textarea>
      <Button>Check</Button>
    </div>
  );
};

export default Detect;
