import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import NavigationBar from "../Navbar/NavigationBar";
import OfferList from "../OfferList";

export default function ViewListingOffers(props) {
  const location = useLocation();
  return (
    <div>
      <NavigationBar />
      <h1>Received Offers</h1>
      <OfferList view={location.state.listing.ifsId} />
    </div>
  );
}
