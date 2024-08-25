import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/trip-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMoneyBills, faFlag, faPhone, faClose } from '@fortawesome/free-solid-svg-icons';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase.config'; 

function TripDetails() {
    const { id } = useParams();
    const [tripdata, setTripData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        const fetchTripData = async () => {
          try {
            const tripDocRef = doc(firestore, 'trips', id);
            const tripDoc = await getDoc(tripDocRef);
    
            if (tripDoc.exists()) {
              setTripData(tripDoc.data());
            } else {
              setError('No such document!');
            }
          } catch (err) {
            setError('Error fetching document');
          } finally {
            setLoading(false);
          }
        };

        fetchTripData();
      }, [id]);
    
    const handleImageToggle = (e) => {
        if (e.target.classList.contains('trip-container') || e.target.classList.contains('close-icon') || e.target.classList.contains('image-div')) {
            setShowImage(!showImage);
        }
    };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

    return (
        <div
            className="trip-container"
            onClick={(e) => {
                e.stopPropagation();
                handleImageToggle(e);
            }} 
            style={{
                backgroundImage: `url(${tripdata.imageUrl})`
            }}>
            {showImage && (
                <div className="image-div">
                    <FontAwesomeIcon 
                    className='close-icon' 
                    icon={faClose} 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleImageToggle(e);
                    }} />
                    <img className='trip-image' src={tripdata.imageUrl} alt="" />
                </div>
            )}
            <div className="trip-content">
                <div className="trip-date">{tripdata.date}</div>
                <div className="trip-name">{tripdata.name}</div>
                <div className="trip-details">
                    <div className="detail-div">
                        <FontAwesomeIcon className='detail-icon' icon={faCalendar} />
                        <span>Date</span>
                        <div>{tripdata.date}</div>
                    </div>
                    <div className="detail-div">
                        <FontAwesomeIcon className='detail-icon' icon={faMoneyBills} />
                        <span>Cost</span>
                        <div>{tripdata.cost}</div>
                    </div>
                    <div className="detail-div">
                        <FontAwesomeIcon className='detail-icon' icon={faFlag} />
                        <span>Organiser</span>
                        <div>{tripdata.organiser}</div>
                    </div>
                    <div className="detail-div">
                        <FontAwesomeIcon className='detail-icon' icon={faPhone} />
                        <span>Contact</span>
                        <div>{tripdata.contact}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TripDetails;
