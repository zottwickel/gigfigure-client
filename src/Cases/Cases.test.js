import React from 'react';
import ReactDOM from 'react-dom';
import Cases from './Cases';
import { BrowserRouter } from 'react-router-dom';

it('renders Cases without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Cases setActiveTab={() => {return;}}/>
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});