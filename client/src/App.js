import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Location from "./components/Location/Location";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Cardlist } from "./components/card-list/card-list";
import { SearchBox } from "./components/search-box/search-box";
import Covid from "./components/covid/covid";
import Detect from "./components/Detect/Detect";

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
    fetch("https://localhost:5000/api/v1/news",{
      method: 'GET'
    })
      .then((response) => response.json())
      .then((users) => this.setState({ news: users }));
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };
  render() {
    const { news, searchField } = this.state;
    console.log("news");
    console.log("news"+news);
    const fnews = news.filter((x) =>
      x.name.toLowerCase().includes(searchField.toLowerCase())
    );
    // console.log(fnews);
    return (
      <BrowserRouter>
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
                      <SearchBox
                        placeholder="search news"
                        handleChange={this.handleChange}
                      />
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
      </BrowserRouter>
    );
  }
}

export default App;

