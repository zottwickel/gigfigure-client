import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LoginProvider } from './contexts/LoginContext';
import { CasesProvider } from './contexts/CasesContext';
import { ContactsProvider } from './contexts/ContactsContext';

/**
 * This is the render function for the app.
 * It contains all the context providers and the 
 *   react-router-dom parent component for BrowserRouter.
 */
ReactDOM.render(
  <BrowserRouter>
    <LoginProvider>
      <CasesProvider>
        <ContactsProvider>
          <App />
        </ContactsProvider>
      </CasesProvider>
    </LoginProvider>
  </BrowserRouter>,
  document.getElementById('root')
);