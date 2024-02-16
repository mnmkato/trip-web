import { useState } from 'react';
import '../styles/style.css';
import Trip from '../assets/images/trip.jpg';

function TripComponent() {
  return (
    <a href="./trip.html">
        <div className="trip">
            <img src={Trip} alt="trip image" />
        </div>
    </a>
  )
}

export default TripComponent
