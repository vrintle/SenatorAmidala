import { doc, setDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { AddressesContext } from "../contexts/AddressesContext";
import { ItemsContext } from "../contexts/ItemsContext";
import { LoginContext } from "../contexts/LoginContext";
import { database } from "../firebase-config";

function Checkout() {
  const { user, setUser } = useContext(LoginContext);
  const { items, setItems } = useContext(ItemsContext);
  const { addresses, setAddresses } = useContext(AddressesContext)
  const [ selectedAddr, setSelectedAddr ] = useState({})
  const [ ordered, setOrdered ] = useState(false)

  const incQty = (id) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) items[i].qty++;
    }
    setItems([...items]);
  };

  const decQty = (id) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        if (items[i].qty > 0) items[i].qty--;
        if (items[i].qty === 0) {
          items.splice(i, 1);
        }
      }
    }
    setItems([...items]);
  };

  const setAddr = addr => {
    setSelectedAddr(addr);
  }

  const makeOrder = async () => {
    let time = Date.now()
    console.log(time)
    let orderRef = doc(database, 'orders', time.toString());
    console.log(time)
    let data = {
      uid: user.uid,
      meals: JSON.stringify(items),
      oid: time
    }
    console.log(data)
    await setDoc(orderRef, data)
    setItems([])
    setOrdered(true)
  }

  useEffect(() => {
    let str = sessionStorage.getItem("items");
    if (str) {
      setItems(JSON.parse(str));
    }
    let addr = sessionStorage.getItem('addresses')
    if(addr) {
      setAddresses(JSON.parse(addr))
    }
    console.log(addresses)
  }, []);

  return (
    'email' in user ?
    <div className="container">
      <br />
      <br />
      { 
        !ordered ? 
        <div className="row">
          <div className="col-9">
            <div className="container">
              <h1>Choose a delivery address</h1>
            </div>
            <br />
            <div className="row">
              {
                addresses.map(addr => {
                  return (
                    <div className="col-6">
                      <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                          <h5 className="card-title">{addr.type}</h5>
                          <p className="card-text">{addr.desc}</p>
                          <button className="btn btn-primary" onClick={ () => setAddr(addr) }>
                            Deliver Here
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <br />
          </div>
          <div className="col-3">
            <h3>Your Cart</h3>
            <br />
            {items.length == 0 ? (
              <p>
                <i>Add some tasty food to your cart...</i>
              </p>
            ) : (
              <div>
                {items.map((item) => {
                  return (
                    <div className="row" id={item.id}>
                      <div className="col-5">
                        <img
                          src={item.image_src}
                          height={55}
                          style={{ marginTop: "7px" }}
                        />
                      </div>
                      <div className="col-7">
                        <p>
                          {item.name} / {item.veg ? "Veg" : "Non-Veg"}
                        </p>
                        <p>
                          <button
                            class="btn btn-outline-info btn-sm"
                            onClick={() => incQty(item.id)}
                          >
                            +
                          </button>
                          <span style={{ margin: "20px" }}>{item.qty}</span>
                          <button
                            class="btn btn-outline-info btn-sm"
                            onClick={() => decQty(item.id)}
                          >
                            -
                          </button>
                        </p>
                        <p>Subtotal: {item.price * item.qty} Rs.</p>
                      </div>
                      <hr />
                    </div>
                  );
                })}
                <br />
                <div style={{ textAlign: "center" }}>
                  { 'type' in selectedAddr ? <p>
                    <b>Address: </b><span>{ selectedAddr.type }</span>
                  </p> : <></> }
                  <h5>
                    Total Amount:{" "}
                    {items.reduce((sum, curr) => {
                      return sum + curr.price * curr.qty;
                    }, 0)}
                  </h5>
                  <button className="btn btn-primary" disabled={ !('type' in selectedAddr) } onClick={ makeOrder }>
                    Order Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div> :
        <div>
          <h1 className="jumbotron">Your order has been placed successfully! :)</h1>
        </div>
      }
    </div> : <></>
  );
}

export default Checkout;
