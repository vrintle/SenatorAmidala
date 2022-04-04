import React, { useState, useEffect } from "react";
import { database } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

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
      <div className="jumbotron jumbotron-fluid text-center my-4">
        <h1>Drones Available For Service</h1>
      </div>

      {drones.map((drone) => {
        return (
          <>
            <div className="row" style={{ height: "320px" }}>
              <div
                className="col-5"
                style={{
                  height: "320px",
                  backgroundColor: "#ebebeb",
                  textAlign: "center",
                  marginTop:"25px"
                }}
              >
                <img
                  src={drone.img_src}
                  alt="..."
                  style={{ height: "70%", textAlign: "center" ,paddingTop:"30px"}}
                />
              </div>
              <div className="col-7 ">
                <div
                  className="container text-lame my-2 "
                  style={{ textAlign: "center" }}
                >
                  <h1>{drone.name}</h1>
                </div>
                <div className="container text-center my-4">
                  <p>{drone.desc}</p>
                </div>
                <div className="row mx-4">
                  <div className="col-6">
                    <span>Range: {drone.range}</span>
                    <br />

                    <span>Power System: {drone.power}</span>
                    <br />

                    <span>Application: {drone.application} </span>
                    <br />
                  </div>
                  <div className="col-6">
                    <span>Payload Capacity: {drone.payload}</span>
                    <br />

                    <span>Swarm: {drone.swarm}</span>
                    <br />

                    <span>Endurance: {drone.endurance}</span>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </>
        );
      })}
    </div>
  );
}

export default App;
