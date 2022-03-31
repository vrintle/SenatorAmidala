import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Order from './pages/Order';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='profile' element={<Profile />} />
        <Route path='order' element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;