import React from 'react';
import './Home.css';

/**
 * This is the landing page component. It gives a brief
 *   explanation of what the app does.
 */

class Home extends React.Component {
  render() {
    return( 
      <div className='h_box'>
        <h3 className='h_header'>Welcome to Gig Figure</h3>
        <p className='h_content'>This is your one stop shop for keeping track of things when you're looking for gigs.</p>
        <p className='h_content'>Cases are made when you talk to someone online or offline about a gig or play a gig.</p>
        <p className='h_content'>Contacts are people you play with, people that hire you, or people that can lead you to any of the above.</p>
        <p className='h_content'>Demo user email: "userone@test.com", demo user password: "foobar".</p>
      </div>
    );
  };
};

export default Home;