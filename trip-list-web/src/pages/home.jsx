import '../styles/style.css';
import PlaceComponent from '../components/placeComponent';
import TripComponent from '../components/tripComponent';

function Home() {
    const places=[
                {'id':0, 'name':'jinja'},
                {'id':1, 'name':'jinja'},
                {'id':2, 'name':'jinja'},
                {'id':3, 'name':'jinja'},
                {'id':4, 'name':'jinja'},
                {'id':5, 'name':'jinja'}]
    const trips=[
                {'id':0},
                {'id':1},
                {'id':2},
                {'id':3}]
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
                <TripComponent key={trip.id} data={trip} /> 
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home
