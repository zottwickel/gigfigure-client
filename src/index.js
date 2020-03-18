import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LoginProvider } from './contexts/LoginContext';
import { CasesProvider } from './contexts/CasesContext';
import { ContactsProvider } from './contexts/ContactsContext';

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