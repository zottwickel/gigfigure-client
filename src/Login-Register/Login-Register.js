import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import LoginContext from '../contexts/LoginContext';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import Loading from '../Util/Loading';
import './Login-Register.css';

/**
 * These two components handle the login and register forms.
 */

function handleRegister(e, context) {
  e.preventDefault();
  e.persist();
  const { user_name, password, email } = e.target;

  context.clearError();
  AuthApiService.postUser({
    user_name: user_name.value,
    password: password.value,
    email: email.value
  })
    .then(user => {
      AuthApiService.postLogin({
        email: email.value,
        password: password.value
      })
        .then(res => {
          TokenService.saveAuthToken(res.authToken, res.user_id);
          context.beginSession();
        })
        .catch(res => {
          context.setError(res.error);
        });
    })
    .catch(res => {
      context.setError(res.error);
    });
}

export function Login(props) {
  function submitLoad() {
    setDisabled(true);
    setLoading(true);
  }

  function handleLogin(e, context) {
    e.preventDefault();
    e.persist();
    const { email, password } = e.target;
  
    context.clearError();
    AuthApiService.postLogin({
      email: email.value,
      password: password.value
    })
      .then(res => {
        TokenService.saveAuthToken(res.authToken, res.user_id);
        context.beginSession();
      })
      .catch(res => {
        context.setError(res.error);
        setDisabled(false);
        setLoading(false);
      });
  }
  let [loading, setLoading] = useState(false);
  let [disabled, setDisabled] = useState(false);
  return (
    <LoginContext.Consumer>
      {context => { return (
        <div className='lr_form'>
          {(context.isLoggedIn || context.login)? <Redirect to='/' /> :
          <>
          <h3 className='lr_header'>Log in to use the app.</h3>
          <form onSubmit={e => { 
              handleLogin(e, context);
              submitLoad();
              }}>
            <label className='lr_label' htmlFor='email' >Email</label><br />
            <input className='lr_text' type='email' id='email' name='email' placeholder='Your email here' /><br />
            <label className='lr_label' htmlFor='password' >Password</label><br />
            <input className='lr_text' type='password' id='password' name='password' placeholder='Your password here' /><br />
            {(context.error) ? <p className='c_val'>{context.error}</p> : null}
            
            <button className={disabled ? 'lr_button_dis' : 'lr_button'} type='submit' disabled={disabled}>Login</button><br />
            <span className='lr_text'>Not a user?</span><Link to={'/register'}><button className='lr_register_button'>Register</button></Link><br />
            {loading ? <Loading /> : null}
          </form></>}
        </div>
      );}} 
    </LoginContext.Consumer>
  );
}

export function Register(props) {
  function validateUserName(e) {
    if (e.target.value.length > 50 || e.target.value.length < 1 ) {
      setUserName('Screen Name must be between 1 and 50 characters long');
    } else {
      setUserName(null);
    }
  }
  function validateEmail(e) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(e.target.value)) {
      setEmail('Email must be valid');
    } else {
      setEmail(null);
    }
  }
  function validatePassword(e) {
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;
    const newPassword = e.target.value;
    if (newPassword.length < 8) {
      setPassword('Password must be longer than 8 characters');
    } else if (newPassword.length > 72) {
      setPassword('Password must be less than 72 characters');
    } else if (newPassword.startsWith(' ') || newPassword.endsWith(' ')) {
      setPassword('Password must not start or end with empty spaces');
    } else if (!passwordRegex.test(newPassword)) {
      setPassword('Password must contain 1 upper case, lower case, number and special character');
    } else {
      setPassword(null);
      setPasswordValue(newPassword);
    }
  }
  function checkPasswordMatch(e) {
    const confirmPassword = e.target.value;
    if (confirmPassword !== passwordValue) {
      setMatchPassword('Passwords must match');
    } else {
      setMatchPassword(null);
      setValidated(true);
    }
  }
  function submitLoad() {
    setLoading(true);
    setValidated(false);
  }
  let [loading, setLoading] = useState(false);
  let [user_name, setUserName] = useState(null);
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  let [passwordValue, setPasswordValue] = useState(null);
  let [matchPassword, setMatchPassword] = useState(null);
  let [validated, setValidated] = useState(false);
  return (
    <LoginContext.Consumer>
      {context => {return (
        <div className='lr_form'>
          {context.isLoggedIn ? <Redirect to='/' /> :
          <><h3 className='lr_header'>Register to use the app.</h3>
          <form onSubmit={e => { 
            handleRegister(e, context);
            submitLoad();
          }} >
            <label className='lr_label' htmlFor='user_name' >Name</label><br />
            {user_name ? <p className='c_val'>{user_name}</p> : null }
            <input className='lr_text' type='text' id='user_name' name='user_name' placeholder='Your name here' required onChange={(e) => validateUserName(e)} /><br />
            <label className='lr_label' htmlFor='email' >Email</label><br />
            {email ? <p className='c_val'>{email}</p> : null }
            <input className='lr_text' type='email' id='email' name='email' placeholder='Your email here' required onChange={(e) => validateEmail(e)} /><br />
            <label className='lr_label' htmlFor='password' >Password</label><br />
            {password ? <p className='c_val'>{password}</p> : null }
            <input className='lr_text' type='password' id='password' name='password' placeholder='Your password here' required onChange={(e) => validatePassword(e)} /><br />
            <label className='lr_label' htmlFor='conf_password' >Confirm Password</label><br />
            {matchPassword ? <p className='c_val'>{matchPassword}</p> : null }
            <input className='lr_text' type='password' id='conf_password' name='conf_password' placeholder='Retype password' required onChange={(e) => checkPasswordMatch(e)} /><br />
            {(context.error) ? <p className='c_val'>{context.error}</p> : null}
            <button className={!validated ? 'lr_button_dis' : 'lr_button'} type='submit' disabled={!validated}>Register</button><br />
            {loading ? <Loading /> : null }
          </form></>}
        </div>
    );}}
    </LoginContext.Consumer>
  );
}