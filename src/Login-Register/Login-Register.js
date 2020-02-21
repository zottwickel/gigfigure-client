import React from 'react'
import { Redirect } from 'react-router-dom'
import './Login-Register.css'

export function Login(props) {
  function handleSubmit(e) {
    e.preventDefault()
    props.toggleLogin()
  }
  return (
    <div className='lr_form'>
      {props.isLoggedIn ? <Redirect to='/' /> :
      <><h3 className='lr_header'>Log in to use the app.</h3>
      <form onSubmit={e => handleSubmit(e)} >
        <label className='lr_label' for='email' >Email</label><br />
        <input className='lr_text' type='email' id='email' name='email' placeholder='Your email here' /><br />
        <label className='lr_label' for='password' >Password</label><br />
        <input className='lr_text' type='password' id='password' name='password' placeholder='Your password here' /><br />
        <button className='lr_button' type='submit'>Login</button>
      </form></>}
    </div>
  )
}

export function Register(props) {
  function handleSubmit(e) {
    e.preventDefault()
    props.toggleLogin()
  }
  return (
    <div className='lr_form'>
      {props.isLoggedIn ? <Redirect to='/' /> :
      <><h3 className='lr_header'>Register to use the app.</h3>
      <form onSubmit={e => handleSubmit(e)} >
        <label className='lr_label' for='name' >Name</label><br />
        <input className='lr_text' type='text' id='name' name='name' placeholder='Your name here' required /><br />
        <label className='lr_label' for='email' >Email</label><br />
        <input className='lr_text' type='email' id='email' name='email' placeholder='Your email here' required  /><br />
        <label className='lr_label' for='password' >Password</label><br />
        <input className='lr_text' type='password' id='password' name='password' placeholder='Your password here' required /><br />
        <label className='lr_label' for='conf_password' >Confirm Password</label><br />
        <input className='lr_text' type='password' id='conf_password' name='conf_password' placeholder='Retype password' required /><br />
        <button className='lr_button' type='submit'>Register</button>
      </form></>}
    </div>
  )
}