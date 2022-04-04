import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import GoogleLogin from 'react-google-login';
import { signInWithGoogle } from '../firebase-config';

function Navbar() {
  const { displayName, setDisplayName, email, setEmail, pfp, setPfp, logged, setLogged } = useContext(LoginContext);
  const handleAuth = () => {
    signInWithGoogle().then(result => {
      setDisplayName(result.user.displayName);
      setEmail(result.user.email);
      setPfp(result.user.photoURL);
      setLogged(true);
      console.log(result.user);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    setDisplayName(sessionStorage.getItem('display-name') || '');
    setEmail(sessionStorage.getItem('email') || '');
    setPfp(sessionStorage.getItem('pfp') || '');
    setLogged(sessionStorage.getItem('logged') || '');
  }, []);

  useEffect(() => {
    sessionStorage.setItem('display-name', displayName);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('pfp', pfp);
    sessionStorage.setItem('logged', logged);
  });

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            Drone Food Delivery
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
              <form class="d-flex mx-4">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-primary">
                  Search
                </button>
              </form>
            </ul>
            <div class="col-md-1.5">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 me-6">
                <li class="nav-item me-2">
                  <a class="nav-link active" aria-current="page" href="/about">
                    About
                  </a>
                </li>
                <li class="nav-item me-2">
                  <a class="nav-link" href="/drones">
                    Drones
                  </a>

                </li>
                {
                  email.length == 0 ? (
                    <button class="btn btn-outline-primary me-2" onClick={handleAuth} >
                      Sign In
                    </button>
                  ) : (
                    <a href='/profile'>
                      <img src={pfp} height='40' style={{borderRadius: '50%'}} alt={displayName} title={displayName} />
                    </a>
                  )
                }
              </ul>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

