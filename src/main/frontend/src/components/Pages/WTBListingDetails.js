import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import WTBService from "../../services/WTBService";
import NavigationBar from "../Navbar/NavigationBar";

export default function WTB(props) {
  const history = useHistory();
  const location = useLocation();

  const deal = (listing) => {
    history.push({
      pathname: "/deal",
      state: { listing: listing }
      });
  };

  return (

    <div>
      <NavigationBar />
      <h1>Listing</h1>
      
      <h2>{location.state.listing.title}</h2>
      <p>{location.state.listing.description}</p>
      <p>
        Price: {location.state.listing.priceLower} - {location.state.listing.priceUpper}
      </p>
      <p>
          <Button onClick={() => deal(location.state.listing)}>Propose Deal</Button>
        </p>
    </div>
  );
}
