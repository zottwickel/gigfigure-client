import React from 'react'
import './Case.css'

class Case extends React.Component {

  render() {
    return(
      <div className='ca_box'>
        <h3 className='ca_header'>Case 1</h3>
        <h4 className='ca_subheading'>Contact:</h4>
        <p>Contact One</p>
        <h4 className='ca_subheading'>Notes:</h4>
        <p>Called Contact One and confirmed that they are booked up on thursday. Contact One also mentioned that after Thursday they will be more than happy to have us in. Their schedule is open from 7PM-9PM Mondays, Wednesdays, and Fridays.</p>
        <h4 className='ca_subheading'>Date:</h4>
        <p>2/21/2020 at 4:00PM</p>
      </div>
    )
  }
}

export default Case