import React from 'react';
import './Loading.css';

/**
 * This is where that swirling gif is rendered.
 * It is designed to display when things are waiting
 *   for a response from the server.
 */

function Loading() {
  return (
    <div className='loading'>
      <img className='loading_gif' src={require('../images/loading.gif')} alt='loading gif' />
    </div>
  );
}

export default Loading;