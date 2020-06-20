import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Location from "./components/Location/Location";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Location />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
