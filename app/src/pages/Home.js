import React, { useState, useEffect, useContext } from 'react';
import { database } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { LoginContext } from '../contexts/LoginContext';
import { ItemsContext } from '../contexts/ItemsContext';
import { AddressesContext } from '../contexts/AddressesContext';

function App() {
  const [meals, setMeals] = useState([])
  const mealsRef = collection(database, 'meals')
  const { user } = useContext(LoginContext)
  const { items, setItems } = useContext(ItemsContext)
  const { addresses, setAddresses } = useContext(AddressesContext)
  
  useEffect(() => {
    const getMeals = async () => {
      const data = await getDocs(mealsRef)
      console.log(data)
      setMeals(data.docs.map(doc => {
        return {
          ...doc.data(), 
          id: doc.id
        };
      }))
      console.log(meals);
    }
    getMeals()
    let str = sessionStorage.getItem('items')
    if(str) {
      setItems(JSON.parse(str))
      console.log(items)
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('items', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    let addr = sessionStorage.getItem('addresses')
    if(addr) {
      setAddresses(JSON.parse(addr))
    }
    console.log(addresses)
  }, [addresses]);

  const addItem = id => {
    const check = items.filter(item => item.id === id);
    if(check.length == 0) {
      const res = meals.filter(meal => meal.id === id)[0];
      const item = {
        ...res,
        qty: 1
      };
      setItems([
        ...items, item
      ]);
      console.log(items);
    } else {
      for(let i = 0; i < items.length; i++) {
        if(items[i].id === id) {
          items[i].qty++;
        }
      }
      setItems([ ...items ])
    }
  }

  const incQty = id => {
    for(let i = 0; i < items.length; i++) {
      if(items[i].id === id) items[i].qty++;
    }
    setItems([ ...items ]);
  }

  const decQty = id => {
    for(let i = 0; i < items.length; i++) {
      if(items[i].id === id) {
        if(items[i].qty > 0) items[i].qty--;
        if(items[i].qty === 0) {
          items.splice(i, 1);
        }
      }
    }
    setItems([ ...items ]);
  }

  return (
    <div className='container'>
      <br /><br />
      <div className='row'>
        <div className='col-9'>
          <h3>Foods Near You</h3>
          <br />
          <div className='row'>
            {
              meals.map(meal => {
                return (
                  <div className='col my-1' id={meal.id}>
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
                        <button className="btn btn-primary my-2"  style={{ textAlign: 'center',padding: '7px 22px', pointerEvents: 'auto'}} onClick={() => addItem(meal.id)} disabled={ !user.uid } title={ user.uid ? "" : "You need to sign in first." } >Add to Cart</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='col-3'>
          <h3>Your Cart</h3>
          <br />
          {
            items.length == 0 ? (
              <p><i>Add some tasty food to your cart...</i></p>
            ) : (
              <div>
                {
                  items.map(item => {
                    return (
                      <div className='row' id={item.id}>
                        <div className='col-5'>
                          <img src={item.image_src} height={55} style={{marginTop: '7px'}} />
                        </div>
                        <div className='col-7'>
                          <p>{item.name} / {item.veg ? 'Veg' : "Non-Veg"}</p>
                          <p>
                            <button class="btn btn-outline-info btn-sm" onClick={() => incQty(item.id)}>+</button>
                            <span style={{margin: '20px'}}>{item.qty}</span>
                            <button class="btn btn-outline-info btn-sm" onClick={() => decQty(item.id)}>-</button>
                          </p>
                          <p>Subtotal: {item.price * item.qty} Rs.</p>
                        </div>
                        <hr />
                      </div>
                    )
                  })
                }
                <br />
                <div style={{textAlign: 'center'}}>
                  <h5>Total Amount: { items.reduce((sum, curr) => {
                    return sum + curr.price * curr.qty;
                  }, 0) }</h5>
                  <a href='/checkout' class="btn btn-primary" style={{paddingLeft: '36px', paddingRight: '36px'}}>Checkout</a>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
