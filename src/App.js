import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Contacts from './Contacts/Contacts';
import Cases from './Cases/Cases';
import Foot from './Foot/Foot';
import LoginContext from './contexts/LoginContext';
import { Login, Register } from './Login-Register/Login-Register';
import './App.css';
/**
 * This is the main app component where all the action happens.
 * It contains some switch/route components that will render
 *   different components based on URL.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      activeTab: 'none',
      toggleLogin: () => {
        this.setState({
          isLoggedIn: !this.state.isLoggedIn,
        });
      },
      setActiveTab: (tab) => {
        this.setState({
          activeTab: tab
        });
      }
    };
  };

  static contextType = LoginContext;
  componentDidMount() {
    this.context.setSession();
  };
  render() {
    return (
      <div className="App wrapper">
        <Nav {...this.state} />
        <main className='content'>
          <Switch>
            <Route
              exact path='/'
              render={props => <Home {...props} {...this.state} />}
            />
            <Route
              exact path='/contacts'
              render={props => <Contacts {...props} {...this.state} />}
            />
            <Route
              path='/cases'
              render={props => <Cases {...props} {...this.state} />}
            />
            <Route
              exact path='/login'
              render={props => <Login {...props} {...this.state} />}
            />
            <Route
              exact path='/register'
              render={props => <Register {...props} {...this.state} />}
            />
            <Route
              render={props => <Home {...props} {...this.state} />}
            />
          </Switch>
        </main>
        <Foot />
        <div className='shoe'></div>
      </div>
    );
  };
};

export default App;
