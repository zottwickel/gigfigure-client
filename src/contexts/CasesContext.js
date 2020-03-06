import React, { Component } from 'react'

const CasesContext = React.createContext({
  cases: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setCases: () => {},
})

export default CasesContext

export class CasesProvider extends Component {
  state = {
    cases: [],
    error: null
  }

  setError = (error) => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setCases = (cases) => {
    this.setState({ cases })
  }

  render() {
    const value = {
      cases: this.state.cases,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setCases: this.setCases
    }
    return (
      <CasesContext.Provider value={value}>
        {this.props.children}
      </CasesContext.Provider>
    )
  }
}