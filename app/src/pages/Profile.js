import React from 'react';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(() => {
    let str = sessionStorage.getItem('user');
    if(str) {
      return JSON.parse(str);
    }
    return {};
  })

  return (
    <div className='container'>
      <br />
      <br />
      <div className='row'>
        <div className='col-4'>
          <p>
            <img src={user.photoURL} alt={user.displayName} style={{borderRadius: '50%'}} />
          </p>
          <p>
            <h3>{user.displayName}</h3>
            <p>{user.email}</p>
          </p>
          <br />
          <div>
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Past Orders</button>
              <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">My Addresses</button>
            </div>
          </div>
        </div>
        <div className='col-8'>
          <div class="tab-content" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
            <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
          </div>          
        </div>
      </div>
    </div>
  );
}

export default App;