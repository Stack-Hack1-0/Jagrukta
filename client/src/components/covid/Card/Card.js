import React from "react";

const Cards = (props) => {
  return (
    <div
      style={{
        width: "200px",
        height: 150,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#f05454",
        margin: 10,
        alignItems: "center",
      }}
    >
      {/* <image
        // source={{
        //   uri: "https://www.mohfw.gov.in/assets/images/icon-inactive.png",
        // }}
      
        style={{ width: 50, height: 50, marginTop: 20 }}
      /> */}
      <img
        style={{ width: 50, height: 50, marginTop: 20 }}
        src="https://www.mohfw.gov.in/assets/images/icon-inactive.png"
      />
      <div
        style={{
          color: "white",
          fontSize: 20,
          textAlign: "center",
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        {props.number}
      </div>
      <div
        style={{
          color: "white", //#015b25
          fontSize: 20,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {props.title}
      </div>
    </div>
  );
};

export default Cards;
