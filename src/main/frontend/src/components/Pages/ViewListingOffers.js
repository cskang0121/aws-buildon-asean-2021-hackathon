import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import NavigationBar from "../Navbar/NavigationBar";
import OfferList from "../OfferList";

const styles = {
  title: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: 40,
    marginBottom: 40,
    marginTop: 40,
    textAlign: "center",
  },
};

export default function ViewListingOffers(props) {
  const location = useLocation();
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="row">
            <span style={styles.title}>View all received offers</span>
        </div>
        <OfferList view={location.state.listing.ifsId} />
      </div>
    </div>
  );
}
