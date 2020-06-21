import React from "react";

import "./card.css";

export const Card = (props) => {
  return (
    <div className="card-container">
      <h4>{props.news.data}</h4>
      <div style={{ fontSize: "small", marginTop: "40px" }}>
        <div>detected on</div>
        <div>{new Date(props.news.createdAt).toISOString().slice(0, 10)}</div>
      </div>
    </div>
  );
};
