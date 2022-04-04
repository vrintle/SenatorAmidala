import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Drones from './pages/Drones';
import Footer from './components/Footer';
import { LoginContext } from './contexts/LoginContext';
import Checkout from './pages/Checkout';
import { ItemsContext } from './contexts/ItemsContext';

function App() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [pfp, setPfp] = useState('');
  const [logged, setLogged] = useState(false)
  const [items, setItems] = useState([])

  return (
    <div className='App'>
      <LoginContext.Provider value={{ displayName, setDisplayName, email, setEmail, pfp, setPfp, logged, setLogged, items, setItems }}>
        <ItemsContext.Provider value={{ items, setItems }}>
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
        </ItemsContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;