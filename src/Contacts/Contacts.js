import React from 'react'
import { Redirect } from 'react-router-dom'
import LoginContext from '../contexts/LoginContext'
import CasesContext from '../contexts/CasesContext'
import ContactsApiService from '../services/contacts-api-service'
import './Contacts.css'

class Contacts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: false,
      name: null,
      type: null,
      disabled: true
    }
    this.callContacts = () => {
      this.context.clearError()
      ContactsApiService.getContacts()
        .then(this.context.setContacts)
        .catch(this.context.setError)
    }
  }

  static contextType = CasesContext

  componentDidMount() {
    this.props.setActiveTab('contacts')
    this.callContacts() 
  }

  componentWillUnmount() {
    this.props.setActiveTab('none')
  }

  toggleForm(e) {
    e.preventDefault()
    this.setState({
      form: !this.state.form
    })
  }

  validateName(e) {
    if (e) {
      let valName = e.target.value
      if (valName.length < 4 || valName.length > 50) {
        this.setState({
          name: 'Please keep the name between 4 and 50 characters.',
        })
        this.setState({
          disabled: true
        })
      } else {
        this.setState({
          name: undefined,
        })
      }
      this.validateType()
    } else if (this.state.name === undefined && this.state.type === undefined) {
      this.setState({
        disabled: false
      })
    }
  }

  validateType(e) {
    if (e) {
      e.preventDefault()
      let valType = e.target.value
      if (valType.length < 4 || valType.length > 50) {
        this.setState({
          type: 'Please keep contact type between 4 and 50 characters.',
        })
        this.setState({
          disabled: true
        })
      } else {
        this.setState({
          type: undefined
        })
      }
      this.validateName()
    } else if (this.state.name === undefined && this.state.type === undefined) {
      this.setState({
        disabled: false
      })
    }
  }

  submitContact(e) {
    e.preventDefault()
    e.persist()

    const name = e.target.name.value
    const type = e.target.type.value
    const subtype = e.target.subtype.value
    const phone = e.target.phone.value
    const email = e.target.email.value
    const notes = e.target.notes.value

    ContactsApiService.postContact(name, type, subtype, phone, email, notes)
      .then(this.callContacts)
      .then(this.toggleForm(e))
      .catch(this.context.setError)
    
    e.target.name.value = ''
    e.target.type.value = ''
    e.target.subtype.value = ''
    e.target.phone.value = ''
    e.target.email.value = ''
    e.target.notes.value = ''
  }

  render() {
    return( 
      <div className='contact_folder'>
        <LoginContext.Consumer>
          {loginContext => { return(
            <>
              {!loginContext.isLoggedIn ? <Redirect to='/login' /> : null }
            </>
          )}}
        </LoginContext.Consumer>
        <button className='form_toggle' onClick={e => this.toggleForm(e)}>{!this.state.form ? 'Add New Contact' : 'Close Form'}</button>
        { this.state.form ?
        <>
          <h3 className='c_header'>New Contact</h3>
          <form className='c_new' onSubmit={e => this.submitContact(e)}>
            <label className='c_label' htmlFor='name'>Contact Name</label><br />
            {(this.state.name) ? <p className='c_val'>{this.state.name}</p> : null}
            <input className='c_text' id='name' name='name' type='text' placeholder='Contact Name' onChange={e => this.validateName(e)} /><br />
            <label className='c_label' htmlFor='type'>Contact Type</label><br />
            {(this.state.type) ? <p className='c_val'>{this.state.type}</p> : null}
            <input className='c_text' id='type' name='type' type='text' placeholder='Musician, Booker, Supporter, etc...' onChange={e => this.validateType(e)} /><br />
            <label className='c_label' htmlFor='subtype'>Contact Subtype</label><br />
            <input className='c_text' id='subtype' name='subtype' type='text' placeholder='Drummer, Info Line, Media Shop, Etc...' /><br />
            <label className='c_label' htmlFor='subtype'>Contact Notes</label><br />
            <input className='c_text' id='notes' name='notes' type='text' placeholder='Notes' /><br />
            <label className='c_label' htmlFor='phone'>Phone Number</label><br />
            <input className='c_text' id='phone' name='phone' type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' placeholder='Ex: 555-555-5555' /><br />
            <label className='c_label' htmlFor='email'>Contact Email</label><br />
            <input className='c_text' id='email' name='email' type='email' placeholder='example@domain.com' /><br />
            <button type='submit' className={(this.state.disabled) ? 'c_button_dis' : 'c_button'} disabled={this.state.disabled}>Create Contact</button>
          </form>
        </>
        : null }
        
        <h3 className='c_header'>Your contacts</h3>
        {(this.context.contacts.length === 0) ? <p>You have no contacts yet.</p> : null}
        <ul className='c_list'>
          {this.context.contacts.map(contact => {
            return (
              <li key={contact.contact_id} className='c_item'>
                <h4>{contact.name}</h4>
                <p className='c_left'>{contact.type}</p>
                <p className='c_right'>{contact.subtype}</p><br />
                <p className='c_left'><a href={`tel:${contact.phone}`}>{contact.phone}</a></p>
                <p className='c_right'><a href={`mailto:${contact.email}`}>{contact.email}</a></p><br />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Contacts