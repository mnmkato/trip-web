import React, { useState, useEffect } from 'react';
import PlaceComponent from '../components/placeComponent';
import TripComponent from '../components/tripComponent';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../firebase.config';

function Home() {
  const [trips, setTrips] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const tripsCollectionRef = collection(firestore, 'trips');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const querySnapshot = await getDocs(tripsCollectionRef);
        const tripsData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTrips(tripsData);
        const uniquePlaces = [...new Set(tripsData.map(trip => trip.location))];
        setPlaces(uniquePlaces);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const filteredTrips = trips
    .filter(trip => !selectedPlace || trip.location === selectedPlace)
    .filter(trip => trip.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCancelSelection = () => {
    setSelectedPlace(null);
    setSearchTerm(''); // Clear search term when showing all trips
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const noResults = searchTerm && filteredTrips.length === 0;

  return (
    <div className="container">
      <div className="content">
        <span>Explore<br /><b>Uganda's beauty</b></span>
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="search"
            className="search-input"
            placeholder="Search for trips"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="trips-div">
          <PlaceComponent data={places} onSelectPlace={setSelectedPlace} />
          <div className="trips-recommended">
            <div className="trips-header">
              <h3>
                {selectedPlace ? `Trips to ${selectedPlace}` : 'Trips'}
              </h3>
              {selectedPlace && (
                <button onClick={handleCancelSelection} className="cancel-selection-button">
                  Show All Places
                </button>
              )}
            </div>
            <div className="trips-grid">
              {noResults ? (
                <div className="no-results">
                  No results found for "{searchTerm}"
                </div>
              ) : (
                filteredTrips.map((trip) => (
                  <TripComponent key={trip.id} tripdata={trip} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
