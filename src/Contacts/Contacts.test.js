import React from 'react'
import ReactDOM from 'react-dom'
import Contacts from './Contacts'
import { BrowserRouter } from 'react-router-dom'

it('renders Contacts without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
  <BrowserRouter>
    <Contacts setActiveTab={() => {return}}/>
  </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})