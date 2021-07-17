import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import AuthenticationService from "../../services/AuthenticationService";
import { useHistory } from "react-router";

export default function NavigationBar() {
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  // Detect if user logged in
  useEffect(() => {
    const user = AuthenticationService.getCurrentUserToken();

    if (user && user.token) {
      setLoggedIn(true);
    }
  }, []);

  function logout() {
    AuthenticationService.signOut();
    history.push({
      pathname: "/login",
    });
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        {loggedIn ? (
          <div className="d-flex flex-row">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/my-listings">My Listings</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/post-listing">Buy / Sell</Nav.Link>
            <Nav.Link href="/received-offers">View All Offers</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </div>
        ) : (
          <div className="d-flex flex-row">
            <Nav.Link href="/register">Sign Up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </div>
        )}
      </Nav>
    </Navbar>
  );
}
