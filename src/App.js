import React, { Component } from 'react';
import './App.css';

import Search from './Components/Search';
import Weather from './Components/Weather';
//import {a} from './test';

class App extends Component {
  
  render() {
    //a();
    return (
      <div className="App">
        <div className="App-SearchBox">
            <Search /> 
        </div>
        <div className="App-WeatherBox">
            <Weather /> 
        </div>
      </div>
    );
  }
}

export default App;
