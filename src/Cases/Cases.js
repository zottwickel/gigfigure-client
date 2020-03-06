import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import LoginContext from '../contexts/LoginContext'
import CasesContext from '../contexts/CasesContext'
import CasesApiService from '../services/cases-api-service'
import formatDate from '../services/format-date'
import Loading from '../Util/Loading'
import Case from './Case/Case'
import './Cases.css'

class Cases extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: false,
      contacts: 1
    }
    this.callCases = () => {
      this.context.clearError()
      CasesApiService.getCases()
        .then(this.context.setCases)
        .catch(this.context.setError)
    }
  }

  static contextType = CasesContext

  toggleForm(e) {
    e.preventDefault()
    this.setState({
      form: !this.state.form
    })
  }

  addContactDropdown(e) {
    e.preventDefault()
    if (this.state.contacts < 5) {
      this.setState({
        contacts: this.state.contacts + 1
      })
    }
  }

  removeContactDropdown(e) {
    e.preventDefault()
    if (this.state.contacts > 1) {
      this.setState({
        contacts: this.state.contacts - 1
      })
    }
  }

  componentDidMount() {
    this.props.setActiveTab('cases')
    this.callCases()
    window.scrollTo(0, 0)
  }

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  componentWillUnmount() {
    this.props.setActiveTab('none')
  }

  render() {
    const contactComp = []
    for (let i=0; i < this.state.contacts; i++) {
      contactComp.push(
        <>
          <select className='c_text' id='name' name='name' type='text' placeholder='Contact Name' >
            <option value='null'>{'->Choose One<-'}</option>
            <option value='Contact One'>Contact One</option>
            <option value='Contact Two'>Contact Two</option>
            <option value='Contact Three'>Contact Three</option>
            <option value='Contact Four'>Contact Four</option>
          </select><br />
        </>
      )
    }
    return(
      <div className='contact_folder' ref={this.scrollRef}>
        <LoginContext.Consumer>
          {loginContext => { return(
            <>
              {!loginContext.isLoggedIn ? <Redirect to='/login' /> : null }
            </>
          )}}
        </LoginContext.Consumer>
        <Route 
          exact path='/cases/:case_id'
          render={props => <Case {...props} />}
        />
        <button className='form_toggle' onClick={e => this.toggleForm(e)}>{!this.state.form ? 'Add New Case' : 'Close Form'}</button>
        { this.state.form ?
        <>
          <h3 className='c_header'>New Case</h3>
          <form className='c_new'>
            <p className='c_label'>Contacts</p>
            {contactComp.map(el => el)}
            <button className='c_add' onClick={e => this.addContactDropdown(e)}>More</button>
            <button className='c_min' onClick={e => this.removeContactDropdown(e)}>Less</button><br />
            <label className='c_label' htmlFor='notes'>Case Notes</label><br />
            <textarea className='c_text c_area' id='notes' name='notes' placeholder='Called "so and so" and planned "such and such".'></textarea><br />
            <button type='submit' className='c_button' onClick={e => e.preventDefault()}>Save Case</button>
          </form>
        </>
        : null }
        <h3 className='c_header'>Your Cases</h3>
        { (this.context.cases.length === 0) ? <Loading /> : null}
        <ul className='c_list'>
          {this.context.cases.map(singleCase => {
            return (
              <li key={singleCase.case_id} className='ca_item'>
                <div>
                  <Link to={`/cases/${singleCase.case_id}`} ><h3 className='ca_header'>{`Case ${singleCase.case_id}`}</h3></Link>
                  <h4 className='ca_subheading'>Notes:</h4>
                  <p className='ca_notes'>{singleCase.case_notes.substring(0,50) + '...'}</p>
                  <h4 className='ca_subheading'>Date:</h4>
                  <p className='ca_notes'>{formatDate(singleCase.date)}</p>
                  <h4 className='ca_subheading'>Contacts:</h4>
                  <ul>
                    {singleCase.contacts.map(contact => {
                      return(
                        <li key={contact.contact_id}>
                          <p>{contact.name}</p>
                        </li>
                      )
                    })}
                  </ul>
                  <p className='ca_notes'></p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Cases