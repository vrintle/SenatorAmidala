import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Order from './pages/Order';
import Drones from './pages/Drones';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/order' element={<Order />} />
        <Route exact path='/drones' element={<Drones />} />
      </Routes>
    </Router>
  );
}

export default App;