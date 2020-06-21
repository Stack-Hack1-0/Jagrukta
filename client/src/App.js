import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Location from "./components/Location/Location";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import { Cardlist } from "./components/card-list/card-list";
import Covid from "./components/covid/covid";
import Detect from "./components/Detect/Detect";
import Axios from "axios";
import Button from "./components/Button/Button";

class App extends Component {
  constructor() {
    super();
    this.state = {
      news: [],
      searchField: "",
      stateName: "",
    };
  }

  componentDidMount() {
    const url = "http://localhost:5000/api/v1/news";
    Axios.get(url)
      .then((res) => {
        console.log(res);
        console.log(res.data.all_news);
        this.setState({ news: res.data.all_news });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };
  render() {
    const { news, searchField } = this.state;
    const fnews = news.filter((x) =>
      x.data.toLowerCase().includes(searchField.toLowerCase())
    );
    // console.log(fnews);
    return (
      <div className="App">
        <Layout>
          <Location
            stateHandler={(name) => this.setState({ stateName: name })}
          ></Location>
          <Switch>
            <Route
              exact
              path="/"
              component={() => {
                return (
                  <div>
                    <div
                      style={{
                        color: "white",
                        fontSize: "large",
                        margin: " 10px",
                      }}
                    >
                      Got a forwarded news on whatsapp. It could be misleading.
                      Check here its genuinness{" "}
                    </div>
                    <Button clicked={() => this.props.history.push("/detect")}>
                      Detect News
                    </Button>
                    <Cardlist news={fnews} />
                  </div>
                );
              }}
            ></Route>
            <Route
              exact
              path="/covid"
              component={() => <Covid stateName={this.state.stateName} />}
            ></Route>
            <Route exact path="/detect" component={Detect}></Route>
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
