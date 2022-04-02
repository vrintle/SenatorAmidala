import React, { useState, useEffect } from 'react';
import { database } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function App() {
  const [meals, setMeals] = useState([])
  const mealsRef = collection(database, 'meals')
  
  useEffect(() => {
    const getMeals = async () => {
      const data = await getDocs(mealsRef)
      // console.log(data)
      setMeals(data.docs.map(doc => {
        return {
          ...doc.data(), 
          id: doc.id
        };
      }))
      console.log(meals);
    }
    getMeals()
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-9'>
          <h3>Foods Near You</h3>
          <div className='row'>
            {
              meals.map(meal => {
                return (
                  <div className='col my-1'>
                    <div className="card my-1" style={{width: '16rem', height: '25rem'}}>
                      <img src={meal.image_src} className="card-img-top" alt="..." style={{height: '175px'}} />
                      <div className="card-body" style={{height: '100px'}}>
                        <h5 className="card-title">{meal.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{meal.store}</h6>
                        <p className="card-text">
                          Price: {meal.price}<br />
                          {meal.veg ? 'Veg' : 'Non-Veg'}<br />
                        </p>
                      </div>
                        <div style={{ marginLeft:'17px',marginBottom:'10px'}}>
                        <a href="/" className="btn btn-primary my-2 " style={{ textAlign: 'center',padding: '7px 22px'}} >Add to Cart</a>
                        </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
