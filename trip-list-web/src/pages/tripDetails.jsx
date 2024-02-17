import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/trip-style.css';
import tripImage from '../assets/images/trip.jpg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMoneyBills, faFlag, faPhone, faClose } from '@fortawesome/free-solid-svg-icons';
import { trips } from '../data.js';

function TripDetails(data) {
    const { id } = useParams();
    const tripdata = trips[id];
    const [showImage, setShowImage] = useState(false);
    const [imagePath, setImagePath] = useState(null);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const { default: dynamicImage } = await import(`../assets/images/${tripdata.poster}`);
                setImagePath(dynamicImage);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        if (tripdata && tripdata.poster) {
            loadImage();
        }
    }, [tripdata]);

    const handleImageToggle = (e) => {
        if (e.target.classList.contains('trip-container') || e.target.classList.contains('close-icon')) {
            setShowImage(!showImage);
        }
    };

    return (
        <div
            className="trip-container"
            onClick={(e) => handleImageToggle(e)}
            style={{
                backgroundImage: imagePath ? `url(${imagePath})` : `url(${tripImage})`
            }}>
            {showImage && (
                <div className="image-div">
                    <FontAwesomeIcon className='close-icon' icon={faClose} onClick={(e) => handleImageToggle(e)} />
                    <img className='trip-image' src={imagePath ? imagePath : tripImage} alt="" />
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
