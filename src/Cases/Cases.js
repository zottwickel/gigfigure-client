import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import LoginContext from '../contexts/LoginContext'
import CasesContext from '../contexts/CasesContext'
import CasesApiService from '../services/cases-api-service'
import ContactsApiService from '../services/contacts-api-service'
import formatDate from '../services/format-date'
import Loading from '../Util/Loading'
import Case from './Case/Case'
import './Cases.css'

class Cases extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: false,
      contacts: 1,
      notes: null,
      disabled: true
    }
    this.callCases = () => {
      this.context.clearError()
      CasesApiService.getCases()
        .then(this.context.setCases)
        .catch(this.context.setError)
    }
    this.callContacts = () => {
      this.context.clearError()
      ContactsApiService.getContacts()
        .then(this.context.setContacts)
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

  scrollWindow(e) {
    e.preventDefault()
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    this.props.setActiveTab('cases')
    this.callCases()
    this.callContacts()
  }

  componentWillUnmount() {
    this.props.setActiveTab('none')
  }

  validateNotes(e) {
    e.preventDefault()
    const valNotes = e.target.value
    if (valNotes.length < 5 || valNotes.length > 500) {
      this.setState({
        notes: 'Please keep notes between 5 and 500 characters long.',
        disabled: true
      })
    } else {
      this.setState({
        notes: undefined,
        disabled: false
      })
    }
  }

  handleNewCase(e, numContacts) {
    e.preventDefault()
    e.persist()
    const notes = e.target.notes.value
    const contactArr= []
    switch (numContacts) {
      case 1:
        contactArr.push({
          contact_id: e.target.sel0.value
        })
      break
      case 2:
        contactArr.push({
          contact_id: e.target.sel0.value
        },{
          contact_id: e.target.sel1.value
        })
      break
      case 3:
        contactArr.push({
          contact_id: e.target.sel0.value
        }, {
          contact_id: e.target.sel1.value
        }, {
          contact_id: e.target.sel2.value
        })
      break
      case 4:
        contactArr.push({
          contact_id: e.target.sel0.value
        }, {
          contact_id: e.target.sel1.value
        }, {
          contact_id: e.target.sel2.value
        }, {
          contact_id: e.target.sel3.value
        })
      break
      case 5:
        contactArr.push({
          contact_id: e.target.sel0.value
        }, {
          contact_id: e.target.sel1.value
        }, {
          contact_id: e.target.sel2.value
        }, {
          contact_id: e.target.sel3.value
        }, {
          contact_id: e.target.sel4.value
        })
      break
      default:
      break
    }
    e.target.notes.value = ''
    CasesApiService.postCase(notes, contactArr)
      .then(this.callCases)
      .then(this.toggleForm(e))
      .catch(this.context.setError)
  }

  render() {
    
    const contactComp = []
    for (let i=0; i < this.state.contacts; i++) {
      contactComp.push(
        <div key={i.toString()}>
          <select className='c_text' id={'sel' + i} name='name' type='text' placeholder='Contact Name' required>
            <option value=''>{'->Choose One<-'}</option>
            {(this.context.contacts.length > 0 && this.context.contacts[0] !== null) ? this.context.contacts.map(contact => {
              return (
                <option key={contact.contact_id} value={contact.contact_id}>{contact.name}</option>
              )
            }) : null}
          </select><br />
        </div>
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
          <form className='c_new' onSubmit={e => this.handleNewCase(e, contactComp.length)}>
            <p className='c_label'>Contacts</p>
            {contactComp.map(el => el)}
            <button className='c_add' onClick={e => this.addContactDropdown(e)}>More</button>
            <button className='c_min' onClick={e => this.removeContactDropdown(e)}>Less</button><br />
            <label className='c_label' htmlFor='notes'>Case Notes</label><br />
            {(this.state.notes) ? <p className='c_val'>{this.state.notes}</p> : null}
            <textarea className='c_text c_area' id='notes' name='notes' placeholder='Called "so and so" and planned "such and such".' onChange={e => this.validateNotes(e)}></textarea><br />
            <button type='submit' className={(this.state.disabled) ? 'c_button_dis' : 'c_button'} disabled={this.state.disabled}>Save Case</button>
          </form>
        </>
        : null }
        <h3 className='c_header'>Your Cases</h3>
        { (this.context.cases.length === 0) ? <Loading /> : null }
        { (this.context.cases[0] === null) ? <p>You have no cases yet.</p> :
        <ul className='c_list'>
          {this.context.cases.map(singleCase => {
            return (
              <li key={singleCase.case_id} className='ca_item'>
                <div>
                  <button onClick={e => this.scrollWindow(e)} className='ca_header_button'>
                    <Link to={`/cases/${singleCase.case_id}`} >{`Case ${singleCase.case_id}`}</Link>
                  </button>
                  <h4 className='ca_subheading'>Notes:</h4>
                  <p className='ca_notes'>{singleCase.case_notes.substring(0,50) + '...'}</p>
                  <h4 className='ca_subheading'>Date:</h4>
                  <p className='ca_notes'>{formatDate(singleCase.date)}</p>
                  <h4 className='ca_subheading'>Contacts:</h4>
                  <ul>
                    {singleCase.contacts.map((contact, i) => {
                      return(
                        <li key={contact.contact_id + i}>
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
        }
      </div>
    )
  }
}

export default Cases