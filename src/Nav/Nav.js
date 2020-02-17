import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(props) {
  return (
    <div className='nav'>
      <nav>
        {
        props.isLoggedIn
        ? <button className='logout' onClick={props.setLogin}>Logout</button>
        : <><Link to={'/login'}><button className='login'>Login</button></Link>
          <span> | </span>
          <Link to={'/register'}><button className='register'>Register</button></Link></>
        }
        <Link className='nav_title' to={'/'}><h1>Gig Figure</h1></Link>
        <div className='tab_box'>
          <Link to={'/cases'}><span className='nav_tab'>Cases</span></Link>
          <Link to={'/contacts'}><span className='nav_tab'>Contacts</span></Link>
        </div>
      </nav>
    </div>
  )
}