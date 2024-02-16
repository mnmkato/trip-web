import React, { useState } from 'react';
import '../styles/trip-style.css';
import tripImage from '../assets/images/trip.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBills } from '@fortawesome/free-solid-svg-icons'
import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { faPhone} from '@fortawesome/free-solid-svg-icons'
import { faClose} from '@fortawesome/free-solid-svg-icons'

function TripDetails() {
    const [showImage, setShowImage] = useState(false); 

    const handleImageToggle = (e) => {
        if (e.target.classList.contains('trip-container') || e.target.classList.contains('close-icon')) {
            setShowImage(!showImage); 
        }
    };

  return (
    <div className="trip-container" onClick={(e) => handleImageToggle(e)}>
        {showImage && (
            <div className="image-div">
                <FontAwesomeIcon className='close-icon' icon={faClose} onClick={(e) => handleImageToggle(e)}/>
                <img className='trip-image' src={tripImage} alt="" />
            </div>
        )}
        <div className="trip-content">
            <div className="trip-date">Sat, Mar 22</div>
            <div className="trip-name">Jinjera Reggae overdrive</div>
            <div className="trip-details">
                <div className="detail-div">
                    <FontAwesomeIcon className='detail-icon' icon={faCalendar}/>
                    <span>Date</span>
                    <div>22 Mar 2024</div>
                </div>
                <div className="detail-div">
                    <FontAwesomeIcon  className='detail-icon' icon={faMoneyBills}/>
                    <span>Cost</span>
                    <div>50k</div>
                </div>
                <div className="detail-div">
                    <FontAwesomeIcon className='detail-icon'  icon={faFlag}/>
                    <span>Organiser</span>
                    <div>Trip Addicts</div>
                </div>
                <div className="detail-div">
                    <FontAwesomeIcon  className='detail-icon' icon={faPhone}/>
                    <span>Contact</span>
                    <div>0701 418 288</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TripDetails
