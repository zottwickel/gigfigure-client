import React, { Component } from 'react';

const LoginContext = React.createContext({
  isLoggedIn: false,
  error: null,
  setError: () => {},
  clearError: () => {},
  setSession: () => {},
  beginSession: () => {},
  endSession:() => {},
});

export default LoginContext;

export class LoginProvider extends Component {
  state = {
    isLoggedIn: false,
    error: null
  }

  setError = (error) => {
    this.setState({ error });
  }

  clearError = () => {
    this.setState({ error: null });
  }

  beginSession = () => {
      this.setState({ 
        isLoggedIn: !this.state.isLoggedIn,
      });
  }

  endSession = () => {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    });
  }

  setSession = () => {
    if (window.sessionStorage.getItem('auth-token')) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  render() {
    const value = {
      isLoggedIn: this.state.isLoggedIn,
      login: this.state.login,
      register: this.state.register,
      error: this.state.error,
      beginSession: this.beginSession,
      endSession: this.endSession,
      setSession: this.setSession,
      setError: this.setError,
      clearError: this.clearError
    };

    return (
      <LoginContext.Provider value={value}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}