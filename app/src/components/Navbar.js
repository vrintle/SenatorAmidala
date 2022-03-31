import React from "react";

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            Drone Food Delivery
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
              <form class="d-flex mx-4">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-primary" type="submit">
                  Search
                </button>
              </form>
            </ul>
            <div class="col-md-1.5">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 me-6">
                <li class="nav-item me-2">
                  <a class="nav-link active" aria-current="page" href="/">
                    About
                  </a>
                </li>
                <li class="nav-item me-2">
                  <a class="nav-link" href="/">
                    Drones
                  </a>

                </li>
                <button class="btn btn-outline-primary me-2" type="submit">
                  Sign In
                </button>
              </ul>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
