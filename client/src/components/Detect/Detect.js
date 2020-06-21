import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import Axios from "axios";

// const Detect = (props) => {
//   return (
//     <div
//       style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
//     >
//       <h2 style={{ color: "white" }}>Check news</h2>
//       <textarea
//         autoFocus
//         style={{ padding: "5px", border: "grey solid 1px" }}
//         id="input"
//         name="input"
//         rows="10"
//         cols="80"
        
//       ></textarea>
//       <Button>Check</Button>
//     </div>
//   );
// };

class Detect extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user_news: ''
    };
  }

    handleChange = (e) => {
      this.setState({user_news: e.target.value});
    }

    handleSubmit = async (e) => {
      e.preventDefault();
      const url = 'http://localhost:3000/api/v1/check';
      const news = {
        data: this.state.user_news
      };
      console.log(news);
      try{
        const res = await Axios.post(url,news);
        console.log(res);
      }catch(error){
        console.log(error);
      }
    }

  render(){
    return(
      <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <form onSubmit={this.handleSubmit}>
      <h2 style={{ color: "white" }}>Check news</h2>
      <textarea
        autoFocus
        style={{ padding: "5px", border: "grey solid 1px" }}
        id="input"
        name="input"
        rows="10"
        cols="80"
        onChange={this.handleChange}
      ></textarea>
      <Button type="submit">Check</Button>
      </form>
    </div>
    );
  }
}

export default Detect;
