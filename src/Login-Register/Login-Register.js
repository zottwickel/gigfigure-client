import React from 'react'
import { Redirect } from 'react-router-dom'
import LoginContext from '../contexts/LoginContext'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import './Login-Register.css'

function handleLogin(e, context) {
  e.preventDefault()
  e.persist()
  const { email, password } = e.target

  context.clearError()
  AuthApiService.postLogin({
    email: email.value,
    password: password.value
  })
    .then(res => {
      TokenService.saveAuthToken(res.authToken, res.user_id)
      context.beginSession()
    })
    .catch(res => {
      context.setError(res.error)
    })
}

function handleRegister(e, context) {
  e.preventDefault()
  e.persist()
  const { user_name, password, email } = e.target

  context.ClearError()
  AuthApiService.postUser({
    user_name: user_name.value,
    password: password.value,
    email: email.value
  })
    .then(user => {
      handleLogin(e, context)
    })
    .catch(res => {
      context.setError(res.error)
    })
}

export function Login(props) {
  return (
    <LoginContext.Consumer>
      {context => { return (
        <div className='lr_form'>
          {(context.isLoggedIn || context.login)? <Redirect to='/' /> :
          <><h3 className='lr_header'>Log in to use the app.</h3>
          <form onSubmit={e => handleLogin(e, context)} >
            <label className='lr_label' htmlFor='email' >Email</label><br />
            <input className='lr_text' type='email' id='email' name='email' placeholder='Your email here' /><br />
            <label className='lr_label' htmlFor='password' >Password</label><br />
            <input className='lr_text' type='password' id='password' name='password' placeholder='Your password here' /><br />
            <button className='lr_button' type='submit'>Login</button>
          </form></>}
        </div>
      )}} 
    </LoginContext.Consumer>
  )
}

export function Register(props) {

  return (
    <LoginContext.Consumer>
      {context => {return (
        <div className='lr_form'>
          {context.isLoggedIn ? <Redirect to='/' /> :
          <><h3 className='lr_header'>Register to use the app.</h3>
          <form onSubmit={e => handleRegister(e, context)} >
            <label className='lr_label' htmlFor='name' >Name</label><br />
            <input className='lr_text' type='text' id='name' name='name' placeholder='Your name here' required /><br />
            <label className='lr_label' htmlFor='email' >Email</label><br />
            <input className='lr_text' type='email' id='email' name='email' placeholder='Your email here' required  /><br />
            <label className='lr_label' htmlFor='password' >Password</label><br />
            <input className='lr_text' type='password' id='password' name='password' placeholder='Your password here' required /><br />
            <label className='lr_label' htmlFor='conf_password' >Confirm Password</label><br />
            <input className='lr_text' type='password' id='conf_password' name='conf_password' placeholder='Retype password' required /><br />
            <button className='lr_button' type='submit'>Register</button>
          </form></>}
        </div>
    )}}
    </LoginContext.Consumer>
  )
}