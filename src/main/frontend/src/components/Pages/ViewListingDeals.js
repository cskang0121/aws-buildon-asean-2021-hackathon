import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import NavigationBar from "../Navbar/NavigationBar";
import DealList from "../DealList";

const styles = {
  title: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: 40,
    marginBottom: 20,
    marginTop: 20,
  },
};

export default function ViewListingDeals(props) {
  const location = useLocation();
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="row">
          <span style={styles.title}>Received Deals</span>
        </div>

        <DealList view={location.state.listing.wtbId} />
      </div>
    </div>
  );
}
