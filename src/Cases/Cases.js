import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import './Cases.css'

class Cases extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: false
    }
  }

  toggleForm(e) {
    e.preventDefault()
    this.setState({
      form: !this.state.form
    })
  }

  componentDidMount() {
    this.props.setActiveTab('cases')
  }

  componentWillUnmount() {
    this.props.setActiveTab('none')
  }

  render() {
    return(
      <div className='contact_folder'>
        {!this.props.isLoggedIn ? <Redirect to='/login' /> : null }
        <button className='form_toggle' onClick={e => this.toggleForm(e)}>{!this.state.form ? 'Add New Case' : 'Close Form'}</button>
        { this.state.form ?
        <>
          <h3 className='c_header'>New Case</h3>
          <form className='c_new'>
            <label className='c_label' for='name'>Contact</label><br />
            <select className='c_text' id='name' name='name' type='text' placeholder='Contact Name' >
            <option value='null'>{'->Choose One<-'}</option>
              <option value='Contact One'>Contact One</option>
              <option value='Contact Two'>Contact Two</option>
              <option value='Contact Three'>Contact Three</option>
              <option value='Contact Four'>Contact Four</option>
            </select><br />
            <label className='c_label' for='notes'>Case Notes</label><br />
            <textarea className='c_text c_area' id='notes' name='notes' placeholder='Called "so and so" and planned "such and such".'></textarea><br />
            <button type='submit' className='c_button' onClick={e => e.preventDefault()}>Save Case</button>
          </form>
        </>
        : null }
        <h3 className='c_header'>Your Cases</h3>
        <ul className='c_list'>
          <li className='c_item'>
              <h4 className='c_center'><Link to='/cases/case' >Case 1</Link></h4>
              <p className='c_left'>Date/Time:</p>
              <p className='c_right'>2/21/2020 at 4:00PM</p><br />
              <p className='c_left'>Contact:</p>
              <p className='c_right'>Contact One</p><br />
          </li>
          <li className='c_item'>
              <h4 className='c_center'><Link to='/cases/case' >Case 2</Link></h4>
              <p className='c_left'>Date/Time:</p>
              <p className='c_right'>2/21/2020 at 4:00PM</p><br />
              <p className='c_left'>Contact:</p>
              <p className='c_right'>Contact Two</p><br />
          </li>
          <li className='c_item'>
              <h4 className='c_center'><Link to='/cases/case' >Case 3</Link></h4>
              <p className='c_left'>Date/Time:</p>
              <p className='c_right'>2/21/2020 at 4:00PM</p><br />
              <p className='c_left'>Contact:</p>
              <p className='c_right'>Contact Three</p><br />
          </li>
          <li className='c_item'>
              <h4 className='c_center'><Link to='/cases/case' >Case 4</Link></h4>
              <p className='c_left'>Date/Time:</p>
              <p className='c_right'>2/21/2020 at 4:00PM</p><br />
              <p className='c_left'>Contact:</p>
              <p className='c_right'>Contact Four</p><br />
          </li>
        </ul>
      </div>
    )
  }
}

export default Cases