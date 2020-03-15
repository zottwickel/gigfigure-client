import React from 'react'
import ReactDOM from 'react-dom'
import Foot from './Foot'

it('renders Foot without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Foot />, div)
  ReactDOM.unmountComponentAtNode(div)
})