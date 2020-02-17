import React from 'react';
import Nav from './Nav/Nav'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
    }
  }
  render() {
    return (
      <div className="App">
        <Nav isLoggedIn={false} />
      </div>
    )
  }
}

export default App;
