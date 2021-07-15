import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import NavigationBar from "../Navbar/NavigationBar";
import DealList from "../DealList";

export default function ViewListingDeals(props) {
  const location = useLocation();
  return (
    <div>
      <NavigationBar />
      <h1>Received Deals</h1>
      <DealList view={location.state.listing.wtbId} />
    </div>
  );
}
