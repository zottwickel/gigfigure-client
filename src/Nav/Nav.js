import React from 'react'
import { Link } from 'react-router-dom'
import LoginContext from '../contexts/LoginContext'
import TokenService from '../services/token-service'
import './Nav.css'

export default function Nav(props) {

  function handleLogout(e, context) {
    e.preventDefault(e)
    context.endSession()
    TokenService.clearAuthToken()
  }

  const activeTab = props.activeTab

  return (
    <LoginContext.Consumer>
      {context => { return (
        <div className='nav_box'>
          <nav>
            {
            context.isLoggedIn
            ? <div className='logins_box'>
                <button className='logout_button' onClick={e => handleLogout(e, context)}>Logout</button>
              </div>
            : <div className='logins_box'>
                <Link to={'/login'}><button className='login_button'>Login</button></Link>
                <Link to={'/register'}><button className='register_button'>Register</button></Link>
              </div>
            }
            <Link to={'/'}><h1 className='nav_title'>Gig Figure</h1></Link>
            <h2 className='nav_capt'>your gigs - remembered</h2>
            <div className='tab_box'>
              <Link to={'/cases'}><span className={`nav_cases_tab ${activeTab === 'cases' ? 'active' : 'inactive'}`}>Cases</span></Link>
              <Link to={'/contacts'}><span className={`nav_contacts_tab ${activeTab === 'contacts' ? 'active' : 'inactive'}`}>Contacts</span></Link>
            </div>
          </nav>
        </div>
      )}}
    </LoginContext.Consumer>
  )
}