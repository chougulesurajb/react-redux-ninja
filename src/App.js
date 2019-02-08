import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './components/Home';
import Office from './components/Office';
import Post from './components/Posts';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
          Edit <code>src/App.js</code> and save to reload.
          </p>
        {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}


        {/* </header> */}

        <BrowserRouter>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/office" component={Office} />
            <Route path="/post/:post_id" component={Post} />
          </Switch>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
