import '../styles/style.css';
import { Link } from 'react-router-dom';

function TripComponent({tripdata}) {
  return (
    <Link  to={`/trip/${tripdata.id}`}>
        <div className="trip">
            <img src={tripdata.imageUrl} alt="trip image" />
        </div>
    </Link>
  )
}

export default TripComponent
