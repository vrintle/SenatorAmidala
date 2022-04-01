import React from 'react';
import { useEffect, useState } from 'react';

function App() {
  const [displayName, setDisplayName] = useState(
    sessionStorage.getItem('display-name') || ''
  );
  const [email, setEmail] = useState(
    sessionStorage.getItem('email') || ''
  );
  const [pfp, setPfp] = useState(
    sessionStorage.getItem('pfp') || ''
  );

  return (
    <div className='container'>
      <div className='row'>
        <h3>Hello, {displayName}!</h3>
        <p>Email: {email}</p>
      </div>
    </div>
  );
}

export default App;