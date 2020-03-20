import React, { Component } from 'react';

/**
 * This context holds and distributes the contacts from the contacts
 *   endpoint.
 */

const ContactsContext = React.createContext({
  contacts: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setContacts: () => {},
});
export default ContactsContext;

export class ContactsProvider extends Component {
  state = {
    contacts: [],
    error: null,
  }

  setError = (error) => {
    this.setState({ error });
  }

  clearError = () => {
    this.setState({ error: null });
  }

  setContacts = (contacts) => {
    this.setState({ contacts });
  }

  render() {
    const value = {
      contacts: this.state.contacts,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setcontacts: this.setcontacts
    };
    return (
      <ContactsContext.Provider value={value}>
        {this.props.children}
      </ContactsContext.Provider>
    );
  }
}