import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import DealService from "../services/DealService";
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

export default function DealsHistoryList(props) {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = () => {
    DealService.getCurrentUserDealsMade(UserService.getProfile().uid).then(
      (res) => {
        const array = res.data.filter((deal) => deal.status === props.status);
        setDeals(array);
      }
    );
  };

  return deals.map((deal, index) => {
    return (
      <div key={index} className="row" style={styles.container}>
        <div style={styles.textDiv}>
          <span style={styles.paragraph}>
            You proposed a deal to {deal.wtbId.user.username}'s request:
          </span>
          <span style={styles.itemName}>{deal.wtbId.title}</span>
          <span style={styles.paragraph}>Item: ${deal.ifsId.title}</span>
          <span style={styles.paragraph}>
            Date: {new Date(deal.dateOfDeal).toLocaleDateString("en-gb")}
          </span>
        </div>
      </div>
    );
  });
}
