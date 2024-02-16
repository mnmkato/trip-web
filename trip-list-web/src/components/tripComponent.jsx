import { useState } from 'react';
import '../styles/style.css';
import Trip from '../assets/images/trip.jpg';
import { Link } from 'react-router-dom';

function TripComponent({data}) {
  return (
    <Link  to={`/trip/${data.id}`}>
        <div className="trip">
            <img src={Trip} alt="trip image" />
        </div>
    </Link>
  )
}

export default TripComponent
