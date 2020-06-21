import React from "react";
import DATA from "./covidTips.json";
const Card = (props) => {
  return (
    <div style={styles.container}>
      <img src={props.imageUrl} style={{ width: "300px", height: "200px" }} />
      <div
        style={{
          fontSize: "15px",
          paddingTop: "10px",
          paddingVertical: "10px",
          divAlign: "center",
          color: "white",
          height: "50px",
        }}
      >
        {props.desc}
      </div>
    </div>
  );
};

const Tips = (props) => {
  console.log(DATA);
  return (
    <div>
      <h4 style={{ color: "white" }}>Daily covid tips</h4>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-wrap",
          margin: "auto",
        }}
      >
        {DATA.tips.map((el) => {
          return <Card imageUrl={el.imgUrl} desc={el.title} key={el.title} />;
        })}
      </div>
    </div>
  );
};

export default Tips;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "grey",
    borderWidth: 1,
    borderStyle: "solid",
    margin: "5px",
    cursor: "pointer",
    flexWrap: "wrap",
  },
};
