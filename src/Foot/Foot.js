import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Foot.css';

/**
 * This footer contains all of the links to my personal website that will open in a new tab.
 */

class Foot extends React.Component {
  
  render() {
    return (
      <footer className='footer'>
        <p className='foottext'>Website by Scott McKell</p>
        <a className='footitem' rel='noopener noreferrer' target="_blank" href="https://github.com/zottwickel"><FontAwesomeIcon className='icon' icon={faGithub} /> Github</a>
        <a className='footitem' rel='noopener noreferrer' target="_blank" href="https://www.linkedin.com/in/scott-mckell/"><FontAwesomeIcon className='icon' icon={faLinkedin} /> LinkedIn</a>
        <a className='footitem' rel='noopener noreferrer' target="_blank" href="https://scottmckell.com"><FontAwesomeIcon className='icon' icon={faPalette} /> Portfolio</a>
      </footer>
    );
  }
}

export default Foot;