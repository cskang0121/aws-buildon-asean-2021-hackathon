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

export default function DealList(props) {
  const [deals, setDeals] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = () => {
    if (props.view === "all") {
      DealService.getCurrentUserReceivedDeals(
        UserService.getProfile().uid
      ).then((res) => {
        setDeals(res.data);
      });
    } else {
      DealService.getDealsForWtbListing(props.view).then((res) => {
        setDeals(res.data);
      });
    }
  };

  return deals.map((deal, index) => {
    const viewDetails = (deal) => {
      history.push({
        pathname: "/ifs-listing-details",
        state: { listing: deal.ifsId, deal: deal },
      });
    };

    if (deal.status === "p") {
      // Make something less ugly lmao
      return (
        <div className="row" style={styles.container}>
          <div className="col-9" style={styles.textDiv}>
            <span style={styles.paragraph}>
              {deal.seller.username} offered you an item:
            </span>
            <span style={styles.itemName}>{deal.ifsId.title}</span>
            <span style={styles.paragraph}>
              Date: {new Date(deal.dateOfDeal).toLocaleDateString("en-gb")}
            </span>
          </div>
          <div className="col-3" style={styles.buttons}>
            <Button
              onClick={() => {
                viewDetails(deal);
              }}
            >
              View Details
            </Button>
          </div>
        </div>
      );
    }
  });
}
