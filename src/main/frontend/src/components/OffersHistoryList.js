import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import OfferService from "../services/OfferService";
import UserService from "../services/UserService";

const styles = {
  container: {
    boxShadow: "2px 9px 16px 0px rgba(0,0,0,0.25)",
    padding: "2%",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  textDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  paragraph: {
    fontFamily: "Inter, sans-serif",
    fontSize: 18,
    lineHeight: "120%",
    margin: 10,
  },
  itemName: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: 20,
    lineHeight: "120%",
    margin: 10,
  },
};

export default function OffersHistoryList(props) {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = () => {
    OfferService.getCurrentUserOffersMade(UserService.getProfile().uid).then(
      (res) => {
        const array = res.data.filter((offer) => offer.status === props.status);
        setOffers(array);
      }
    );
  };

  return offers.map((offer, index) => {
    return (
      <div key={index} className="row" style={styles.container}>
        <div style={styles.textDiv}>
          <span style={styles.paragraph}>
            You made an offer on {offer.ifsListing.user.username}'s item:
          </span>
          <span style={styles.itemName}>{offer.ifsListing.title}</span>
          <span style={styles.paragraph}>Offer: ${offer.offeredPrice}</span>
          <span style={styles.paragraph}>
            Date: {new Date(offer.dateOfOffer).toLocaleDateString("en-gb")}
          </span>
        </div>
      </div>
    );
  });
}
