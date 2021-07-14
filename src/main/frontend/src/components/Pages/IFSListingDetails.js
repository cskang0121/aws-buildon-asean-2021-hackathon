import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import IFSService from "../../services/WTBService";
import NavigationBar from "../Navbar/NavigationBar";

export default function IFSListing(props) {
  const history = useHistory();
  const location = useLocation();

  const offer = (listing) => {
  history.push({
    pathname: "/offer",
    state: {listing: listing}
    });
  };

  return (

    <div>
      <NavigationBar />
      <h1>Listing</h1>
      
      <h2>{location.state.listing.title}</h2>
      <p>{location.state.listing.description}</p>
      <p>
        Price: {location.state.listing.price}
      </p>
      <p>
          <Button onClick={() => offer(location.state.listing)}>Make Offer</Button>
        </p>
    </div>
  );
}
