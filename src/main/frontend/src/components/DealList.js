import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import DealService from "../services/DealService";
import UserService from "../services/UserService";

export default function DealList(props) {
  const [deals, setDeals] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = () => {
    DealService.getDealsForWtbListing(props.view).then((res) => {
      setDeals(res.data);
      console.log(deals);
    });
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
        <div>
          <p>{deal.seller.username} offered you an item:</p>
          <h2>{deal.ifsId.title}</h2>
          <p>Date: {deal.dateOfDeal}</p>
          <Button
            onClick={() => {
              viewDetails(deal);
            }}
          >
            View Details
          </Button>
        </div>
      );
    }
  });
}
