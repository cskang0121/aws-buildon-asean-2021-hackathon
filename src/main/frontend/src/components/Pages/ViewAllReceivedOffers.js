import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import NavigationBar from "../Navbar/NavigationBar";
import OfferList from "../OfferList";

const styles = {
  title: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: 40,
    marginBottom: 20,
    marginTop: 20,
  },
};

export default function ViewAllReceivedOffers(props) {
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="row">
          <span style={styles.title}>View all received offers</span>
        </div>
        <OfferList view="all" />
      </div>
    </div>
  );
}
