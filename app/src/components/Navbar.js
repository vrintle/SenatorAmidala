import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import GoogleLogin from 'react-google-login';
import { database, signInWithGoogle } from '../firebase-config';
import { collection, setDoc, doc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { AddressesContext } from '../contexts/AddressesContext';

function Navbar() {
  const usersRef = collection(database, 'users')
  const addressRef = collection(database, 'address')
  const { user, setUser } = useContext(LoginContext);
  const { addresses, setAddresses } = useContext(AddressesContext)
  const [ orders, setOrders ] = useState([])

  const handleAuth = () => {
    signInWithGoogle().then(async (result) => {
      setUser(result.user);
      // console.log(result.user);
      console.log('data:', database, result.user, user);
      let userRef = doc(database, 'users', result.user.uid);
      console.log('hi', userRef, user)
      await setDoc(userRef, {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        uid: result.user.uid
      })
      getAddresses(result.user.uid)
      getOrders(result.user.uid)
    }).catch(error => {
      console.log(error);
    })
  }

  const getOrders = async uid => {
    let orderRef = collection(database, 'orders')
    const q = query(orderRef, where("uid", '==', uid))
    console.log('query', q)
    const querySnapshot = await getDocs(q)
    let arr = [];
    querySnapshot.forEach(doc => {
      console.log('doc', doc.data())
      arr.push(doc.data())
      setOrders([ ...orders, doc.data() ])
    })
    sessionStorage.setItem('orders', JSON.stringify(arr))
  }

  const getAddresses = async uid => {
    console.log(uid)
    let home = await getDoc(doc(database, 'address', uid + 'home'));
    console.log(home.data())
    // setAddresses([ ...addresses, home.data() ])
    if(home.data()) addresses.push(home.data())
    let work = await getDoc(doc(database, 'address', uid + 'work'));
    // setAddresses([ ...addresses, work.data() ])
    if(work.data()) addresses.push(work.data())
    let other = await getDoc(doc(database, 'address', uid + 'other'));
    // setAddresses([ ...addresses, other.data() ])
    if(other.data()) addresses.push(other.data())
    setAddresses([...addresses])
    console.log(addresses)
    sessionStorage.setItem('addresses', JSON.stringify(addresses))
  }

  useEffect(() => {
    let str = sessionStorage.getItem('user');
    if(str) {
      setUser(JSON.parse(str));
    } else {
      setUser({});
    }
    // getAddresses(user.uid)
  }, []);

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user))
  }, [user]);

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
                  'email' in user ? (
                    <a href='/profile'>
                      <img src={user.photoURL} height='40' style={{borderRadius: '50%'}} alt={user.displayName} title={user.displayName} />
                    </a>
                  ) : (
                    <button class="btn btn-outline-primary me-2" onClick={handleAuth} >
                      Sign In
                    </button>
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

