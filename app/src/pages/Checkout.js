import { useState, useEffect, useContext } from "react";
import { AddressesContext } from "../contexts/AddressesContext";
import { ItemsContext } from "../contexts/ItemsContext";

function Checkout() {
  const { items, setItems } = useContext(ItemsContext);
  const { addresses, setAddresses } = useContext(AddressesContext)

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
    <div className="container">
      <br />
      <br />
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
                        <button className="btn btn-primary">
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
                <h5>
                  Total Amount:{" "}
                  {items.reduce((sum, curr) => {
                    return sum + curr.price * curr.qty;
                  }, 0)}
                </h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
