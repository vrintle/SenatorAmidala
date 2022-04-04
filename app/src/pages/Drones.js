import React, { useState, useEffect } from "react";
import { database } from "../firebase-config";
import {
  collection,
  getDocs,
 
} from "firebase/firestore";

function App() {
  const [drones, setdrones] = useState([]);
  const [items, setItems] = useState([]);
  const dronesRef = collection(database, "drones");

  useEffect(() => {
    const getdrones = async () => {
      const data = await getDocs(dronesRef);
      console.log(data);
      setdrones(
        data.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      );
      console.log(drones);
    };
    getdrones();
    let str = sessionStorage.getItem("items");
    if (str) {
      setItems(JSON.parse(str));
      console.log(items);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = (id) => {
    const check = items.filter((item) => item.id == id);
    if (check.length == 0) {
      const res = drones.filter((drone) => drone.id == id)[0];
      const item = {
        ...res,
        qty: 1,
      };
      setItems([...items, item]);
      console.log(items);
    } else {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id == id) {
          items[i].qty++;
        }
      }
      setItems([...items]);
    }
  };
  return (
    <div className="container">
      <div className="container my-4 text-center bg-dark text-light"> 
      <h1>Drones Available For Service</h1>
      </div>

      {drones.map((drone) => {
        return (<> 
        <div className="row bg-dark text-light" style={{height:"350px"}}>
          <div className="col-5">
            <img src={drone.img_src}  alt="..."/>
          </div>
          <div className="col-4">
            <div className="container text-primary my-2">
            <h1>{drone.name} Specs</h1>
            
            </div>
            <li>
              <span>Range</span>
              <br />
              <span>{drone.range}</span>
            </li>
            <li>
              <span>Power System</span>
              <br />
              <span >{drone.power}</span>
            </li>
            <li>
              <span>Application</span>
              <br />
              <span>{drone.application}</span>
            </li>
          </div>
          <div className="col-3 my-5">
            <li>
              <span>Payload Capacity</span>
              <br />
              <span>{drone.payload}</span>
            </li>
            <li>
              <span>Swarm</span>
              <br />
              <span>{drone.swarm}</span>
            </li>
            <li>
              <span>Endurance</span>
              <br />
              <span>{drone.endurance}</span>
            </li>
            </div>
        </div>
        <br />
        <br/>
        </>
        )
      })}
    </div>
  );
}

export default App;
