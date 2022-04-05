import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Drones from './pages/Drones';
import Footer from './components/Footer';
import { LoginContext } from './contexts/LoginContext';
import Checkout from './pages/Checkout';
import { ItemsContext } from './contexts/ItemsContext';
import { AddressesContext } from './contexts/AddressesContext';

function App() {
  const [user, setUser] = useState({})
  const [items, setItems] = useState([])
  const [addresses, setAddresses] = useState([])

  return (
    <div className='App'>
      <LoginContext.Provider value={{ user, setUser, items, setItems }}>
        <ItemsContext.Provider value={{ items, setItems }}>
          <AddressesContext.Provider value={{ addresses, setAddresses }}>
            <Router>
              <Navbar />
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/profile' element={<Profile />} />
                <Route exact path='/checkout' element={<Checkout />} />
                <Route exact path='/drones' element={<Drones />} />
              </Routes>
              <Footer/>
            </Router>
          </AddressesContext.Provider>
        </ItemsContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;