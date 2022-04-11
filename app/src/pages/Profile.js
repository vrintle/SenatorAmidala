import { doc, setDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { AddressesContext } from '../contexts/AddressesContext';
import { database } from '../firebase-config';

function App() {
  const [user, setUser] = useState(() => {
    let str = sessionStorage.getItem('user');
    if (str) {
      return JSON.parse(str);
    }
    return {};
  })
  const [type, setType] = useState('')
  const [desc, setDesc] = useState('')
  const { addresses, setAddresses } = useContext(AddressesContext);
  const [ orders, setOrders ] = useState(() => {
    let str = sessionStorage.getItem('orders');
    if(str) {
      return (JSON.parse(str))
    }
    return []
  })

  const addAddr = async () => {
    let addrRef = doc(database, 'address', user.uid + type);
    let addr = {
      type: type,
      desc: desc,
      uid: user.uid
    };
    await setDoc(addrRef, addr)
    let newAddr = [...addresses, addr]
    setAddresses(newAddr)
    sessionStorage.setItem('addresses', JSON.stringify(newAddr));
    setType('')
    setDesc('')
  }

  useEffect(() => {
    let str = sessionStorage.getItem('addresses')
    if (str) {
      setAddresses(JSON.parse(str))
    }
  }, [])

  return (
    'email' in user ?
      <div className='container'>
        <br />
        <br />
        <div className='row'>
          <div className='col-4'>
            <p>
              <img src={user.photoURL} alt={user.displayName} style={{ borderRadius: '50%' }} />
            </p>
            <p>
              <h3>{user.displayName}</h3>
              <p>{user.email}</p>
            </p>
            <br />
            <div>
              <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">My Addresses</button>
                <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Past Orders</button>
              </div>
            </div>
          </div>
          <div className='col-8'>
            <div class="tab-content" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <h4 className='row'>
                  <div className='col-9'>Add a new Address</div>
                  <div className='col-3'>
                    <button class="btn btn-primary" type="button" onClick={addAddr} disabled={!type || !desc}>Add address</button>
                  </div>
                </h4>
                <br />
                <div className='row'>
                  <div className='col-2'>
                    <select class="form-select" aria-label="Default select example" value={type} onChange={evt => setType(evt.target.value)}>
                      <option selected value="">Type</option>
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <p className='col-10'>
                    <input type="text" value={desc} onChange={evt => setDesc(evt.target.value)} class="form-control" placeholder="address description" />
                  </p>
                  <br />
                  <hr />
                </div>
                {
                  addresses.map(addr => {
                    return (
                      <div>
                        <p>
                          <span className='badge bg-secondary'>{addr.type}</span> <span>{addr.desc}</span>
                        </p>
                      </div>
                    )
                  })
                }
              </div>
              <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                {
                  orders.map(order => {
                    return (
                      <div></div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div> : <></>
  );
}

export default App;