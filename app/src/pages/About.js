import React from "react";
// import raj from "./app/public/raj.png";

function App() {
  return (
    <>
    <div className="container">
      <h1>About US</h1>
      <p>Here we Deliver Our Foods Items By Drones  </p>
    </div>
      <div className="row">
        <div className="col-6">
          <div
            className="card"
            style={{
              width: "80%",
              marginLeft: "50px",
              marginRight: "15px",
              marginTop: "30px",
              marginBottom: "10px",
              display: "block",
              height: "90%"
             
            }}
          >
            <div className="container" >
              <img
                src="/images/raj.png"
                class="card-img-top"
                alt="..."
                style={{ height: "280px", width: "250px", marginTop: "5px" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Rajkumar Chauhan</h5>
              <h3>Web Developer</h3>
              <h5>Software Engineer</h5>
              <p className="container">
                Hello,users My self rajkumar chauhan.I'm 2nd Year Student of
                delhi Technological University (DTU).
              </p>
              <div className="container ">
                <span>Email: Rajkumarchauhan84478@gmail.com</span>
                <br />
                <div>Contact: 8287042907</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6"  >
          <div
            className="card"
            style={{
              width: "90%",
              marginRight: "10px",
              marginLeft: "5px",
              marginTop: "30px",
              marginBottom: "10px",
              height: "90%"
            }}
          >
            <div className="container" >
              <img
                src="/images/vrintle.png"
                class="card-img-top"
                alt="..."
                style={{ height: "280px", width: "250px", marginTop: "5px" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Rahul Verma (vrintle)</h5>
              <h3>Web Developer</h3>
              <h5>Software Engineer</h5>
              <p className="container">
                Hello,users My self Rahul Verma.I'm 2nd Year Student of delhi
                Technological University (DTU).
              </p>
              <div className="container ">
                <span>Email: Vrintle@gmail.com</span>
                <br />
                <div>Contact: 7266851293</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
