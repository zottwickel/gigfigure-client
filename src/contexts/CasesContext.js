import React, { Component } from 'react'

const CasesContext = React.createContext({
  cases: [],
  contacts: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setCases: () => {},
})

export default CasesContext

export class CasesProvider extends Component {
  state = {
    cases: [],
    contacts: [],
    error: null
  }

  setError = (error) => {
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setCases = (cases) => {
    this.setState({ cases })
  }

  setContacts = (contacts) => {
    this.setState({ contacts })
  }

  render() {
    const value = {
      cases: this.state.cases,
      contacts: this.state.contacts,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setCases: this.setCases,
      setContacts: this.setContacts
    }
    return (
      <CasesContext.Provider value={value}>
        {this.props.children}
      </CasesContext.Provider>
    )
  }
}