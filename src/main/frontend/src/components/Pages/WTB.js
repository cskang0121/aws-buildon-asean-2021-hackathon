import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import WTBService from "../../services/WTBService";

const WTBListings = () => {
  const [listings, setListings] = useState([]);

  const fetchListings = () => {
    WTBService.getWTBListings().then((res) => {
      console.log(res.data);
      setListings(res.data);
    });
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return listings.map((listing, index) => {
    // Make something less ugly lmao
    return (
      <div>
        <h2>{listing.title}</h2>
        <p>{listing.description}</p>
        <p>
          Price: {listing.priceLower} - {listing.priceUpper}
        </p>
      </div>
    );
  });
};

export default function WTB(props) {
  const history = useHistory();
  const addWTB = () => {
    history.push({
      pathname: "/add-wtb",
    });
  };

  return (
    <div>
      <Button onClick={addWTB}>Add New</Button>
      <h1>Want To Buy Listings</h1>
      <WTBListings />
    </div>
  );
}
