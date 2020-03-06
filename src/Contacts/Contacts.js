import React from 'react'
import { Redirect } from 'react-router-dom'
import LoginContext from '../contexts/LoginContext'
import './Contacts.css'

class Contacts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: false
    }
  }

  componentDidMount() {
    this.props.setActiveTab('contacts')
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
          <form className='c_new'>
            <label className='c_label' for='name'>Contact Name</label><br />
            <input className='c_text' id='name' name='name' type='text' placeholder='Contact Name' /><br />
            <label className='c_label' for='type'>Contact Type</label><br />
            <input className='c_text' id='type' name='type' type='text' placeholder='Musician, Booker, Supporter, etc...' /><br />
            <label className='c_label' for='subtype'>Contact Subtype</label><br />
            <input className='c_text' id='subtype' name='subtype' type='text' placeholder='Drummer, Info Line, Media Shop, Etc...' /><br />
            <label className='c_label' for='phone'>Phone Number</label><br />
            <input className='c_text' id='phone' name='phone' type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' placeholder='Ex: 555-555-5555' /><br />
            <label className='c_label' for='email'>Contact Email</label><br />
            <input className='c_text' id='email' name='email' type='email' placeholder='example@domain.com' /><br />
            <button type='submit' className='c_button' onClick={e => e.preventDefault()}>Create Contact</button>
          </form>
        </>
        : null }
        <h3 className='c_header'>Your contacts</h3>
        <ul className='c_list'>
          <li className='c_item'>
              <h4 className='c_center'>Contact One</h4>
              <p className='c_left'>Musician</p>
              <p className='c_right'>Drums</p><br />
              <p className='c_left'><a href='tel:555-555-5555'>555-555-5555</a></p>
              <p className='c_right'><a href='mailto:contactone@gigfigure.com'>contactone@gigfigure.com</a></p><br />
          </li>
          <li className='c_item'>
            <h4 className='c_center'>Contact Two</h4>
            <p className='c_left'>Booker</p>
            <p className='c_right'>Bar One</p><br />
            <p className='c_left'><a href='tel:555-555-5555'>555-555-5555</a></p>
            <p className='c_right'><a href='mailto:contacttwo@gigfigure.com'>contacttwo@gigfigure.com</a></p><br />
          </li>
          <li className='c_item'>
            <h4 className='c_center'>Contact Three</h4>
            <p className='c_left'>Festival</p>
            <p className='c_right'>Info Line</p><br />
            <p className='c_left'><a href='tel:555-555-5555'>555-555-5555</a></p>
            <p className='c_right'><a href='mailto:contactthree@gigfigure.com'>contactthree@gigfigure.com</a></p><br />
          </li>
          <li className='c_item'>
            <h4 className='c_center'>Contact Four</h4>
            <p className='c_left'>Supporter</p>
            <p className='c_right'>Media Shop One</p><br />
            <p className='c_left'><a href='tel:555-555-5555'>555-555-5555</a></p>
            <p className='c_right'><a href='mailto:contactfour@gigfigure.com'>contactfour@gigfigure.com</a></p><br />
          </li>
        </ul>
      </div>
    )
  }
}

export default Contacts