import '../styles/style.css';
import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config.js'; 

import { Link } from 'react-router-dom';
import PlaceComponent from '../components/placeComponent';
import TripComponent from '../components/tripComponent';
import {places} from '../data.js'
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../firebase.config';

function Home() {
  const [trips, setTrips] = useState([]);
    const tripsCollectionRef = collection(firestore, 'trips');

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const querySnapshot = await getDocs(tripsCollectionRef);
                const tripsData = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                console.log(tripsData)
                setTrips(tripsData);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        fetchTrips();
    }, []);

  return (
    <div className="container">
    <div className="content">
      <span>Explore<br /><b>Uganda's beauty</b></span> 
      <div className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input type="text" className="search-input" placeholder="Search for trips" />
      </div>
      <div className="trips-div">
        <div className="places">
          <h3>Places</h3>
          <div className="places-grid">
          {places.map((place) => (
                <PlaceComponent key={place.id} data={place} /> 
            ))}
          </div>
        </div>
        <div className="trips-recommended">
          <h3>Trips</h3>
          <div className="trips-grid">
            {trips.map((trip) => (
                <TripComponent key={trip.id} tripdata={trip} /> 
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home
