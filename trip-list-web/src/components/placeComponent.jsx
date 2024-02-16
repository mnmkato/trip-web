import { useState } from 'react';
import '../styles/style.css';
import jinja from '../assets/images/Jinja-City-2.jpg';

function PlaceComponent() {
  return (
    <div>
        <img className='place-image' src={jinja} alt="Jinja" />
        <div className='place-name'>Jinja</div>
  </div>
  )
}

export default PlaceComponent
