import React, {Component} from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import NavBar from './components/NavBar';

class App extends Component {
  render = () => {
    return (
      <NavBar/>
    )
  }
}

export default App