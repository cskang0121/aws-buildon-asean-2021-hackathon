import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import AuthenticationService from "../../services/AuthenticationService";
import { useHistory } from "react-router";
import UserService from "../../services/UserService";
import { ReactComponent as Logo } from './logo-final-optimized.svg';

export default function NavigationBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  // Detect if user logged in
  useEffect(() => {
    const user = AuthenticationService.getCurrentUserToken();

    if (user && user.token) {
      setLoggedIn(true);
      setUserProfile(UserService.getProfile());
    }
  }, []);

  function logout() {
    AuthenticationService.signOut();
    history.push({
      pathname: "/login",
    });
  }

  const handleOnSearchSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/search",
      state: { keyword: keyword },
    });
  };

  //post listing + search
  return (
    <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top shadow-sm">
      <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <a class="navbar-brand dark-text" href="/home">
          <Logo width={150}/>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".dual-collapse2"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      {loggedIn ? (
        [
          <form class="form-inline my-2 my-lg-0 form-group input-group">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <button
              class="btn btn-outline-primary my-2 my-sm-0"
              onClick={(event) => handleOnSearchSubmit(event)}
            >
              Search
            </button>
          </form>,
          <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Hello, {userProfile.firstName}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="/my-listings">
                    My Listings
                  </a>
                  <a class="dropdown-item" href="/received-offers">
                    View Received Offers
                  </a>
                  <a class="dropdown-item" href="/received-deals">
                    View Received Deals
                  </a>
                  <a class="dropdown-item" href="/transaction-active">
                    View Active Transactions
                  </a>
                  <a class="dropdown-item" href="/transaction-history">
                    View Transaction History
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" onClick={logout}>
                    Logout
                  </a>
                </div>
              </li>
              <li class="nav-item">
                <a class="btn btn-primary ml-4 mr-2" href="/post-listing">
                  Buy/Sell
                </a>
              </li>
            </ul>
          </div>,
        ]
      ) : (
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="/register">
                Sign Up
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">
                Login
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
