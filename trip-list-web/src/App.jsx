import './styles/style.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import TripDetails from './pages/tripDetails';
import Home from './pages/home';

function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/details">Details</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Home} />
      <Route path="/about" component={TripDetails} />
    </div>
  </Router>
  )
}

export default App
