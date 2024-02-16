import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import TripDetails from './pages/tripDetails';
import Home from './pages/home';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/trip/:id" element={<TripDetails/>} />
    </Routes>
  </Router>
  )
}

export default App
