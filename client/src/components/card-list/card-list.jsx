import React from "react";
import { Card } from "../card/card";
import "./card-list.css";

export const Cardlist = (props) => {
  console.log(props);
  return (
    <div>
      <div style={{ color: "white", paddingBottom: "15px" }}>
        Detected fake news by Jaguktra
      </div>
      <div className="card-list">
        {props.news.map((x) => (
          <Card key={x._id} news={x} />
        ))}
      </div>
    </div>
  );
};
