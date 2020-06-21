import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import Axios from "axios";
import Spinner from "../Spinner/Spinner";

class Detect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_news: "",
      message: null,
      loading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ user_news: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.user_news !== "") {
      const url = "http://localhost:5000/api/v1/check";
      const news = {
        data: this.state.user_news,
      };
      console.log(news);
      try {
        this.setState({ loading: true });
        const res = await Axios.post(url, news);
        console.log(res);
        this.setState({
          message: `Message seems to be ${res.data.message}`,
        });
      } catch (error) {
        console.log(error);
      }
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
        {this.state.message ? (
          <div style={{ color: "white" }}>{this.state.message}</div>
        ) : (
          ""
        )}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Detect;
