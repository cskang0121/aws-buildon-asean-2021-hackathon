import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/wtb">WTB Listings</Nav.Link>
        <Nav.Link href="/register">Sign Up</Nav.Link>
      </Nav>
    </Navbar>
  );
}
