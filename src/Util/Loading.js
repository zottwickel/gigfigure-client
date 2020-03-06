import React from 'react'
import './Loading.css'

function Loading() {
  return (
    <div className='loading'>
      <img className='loading_gif' src={require('../images/loading.gif')} alt='loading gif' />
    </div>
  )
}

export default Loading