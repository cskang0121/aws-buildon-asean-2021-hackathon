import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import AuthenticationService from "../../services/AuthenticationService";
import { useHistory } from "react-router";

export default function NavigationBar() {
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

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
          <Nav.Item className="d-flex flex-column">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/wtb">WTB Listings</Nav.Link>
            <Nav.Link href="/ifs">IFS Listings</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav.Item>
        ) : (
          <Nav.Item className="d-flex flex-column">
            <Nav.Link href="/register">Sign Up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
  );
}
