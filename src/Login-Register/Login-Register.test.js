import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Register, Login } from './Login-Register';

describe('Login-Register', () => {
  it('renders Login without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders Register without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});