import React, {Component} from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import {Cardlist} from './components/card-list/card-list';
import {SearchBox} from './components/search-box/search-box';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Layout></Layout>
//       </div>
//     </BrowserRouter>
//   );
// }

class App extends Component{
  constructor(){
    super();
    this.state = {
      news:[],
      searchField:''
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({news: users}));
  }

  handleChange = (e) => {
    this.setState({searchField: e.target.value});
  }
  render(){
    const {news, searchField} = this.state;
    const fnews = news.filter(x => x.name.toLowerCase().includes(searchField.toLowerCase()));
    return(
        <BrowserRouter>
          <div className="App">
              <Layout></Layout>
              <SearchBox
                placeholder = 'search news'
                handleChange= {this.handleChange}
              />       
              <Cardlist news={fnews}/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
