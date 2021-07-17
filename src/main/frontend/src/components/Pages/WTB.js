import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import WTBService from "../../services/WTBService";
import NavigationBar from "../Navbar/NavigationBar";
import UserService from "../../services/UserService";

const WTBListings = () => {
  const [listings, setListings] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = () => {
    WTBService.getCurrentUserWTBListings(UserService.getProfile().uid).then((res) => {
      console.log(res.data);
      setListings(res.data);
    });
  };

  function deleteWTB(listing) {
    WTBService.postDeleteWTB(listing).then((res) => {
      fetchListings();
    });
  }

  // function editWTB(listing) {
  //   WTBService.postEditWTB(listing);
  // }

  return listings.map((listing, index) => {
    const wtbDetails = (listing) => {
      history.push({
        pathname: "/wtb-listing-details",
        state: { listing: listing },
      });
    };
    // Make something less ugly lmao
    return (
      <div key={index}>
        <h2>{listing.title}</h2>
        <p>{listing.description}</p>
        <p>
          Price: {listing.priceLower} - {listing.priceUpper}
        </p>
        <p>
          <Button onClick={() => wtbDetails(listing)}>View Details</Button>
        </p>
        <p>
          <Button onClick={() => deleteWTB(listing)}>Delete Listing</Button>
        </p>
      </div>
    );
  });
};

export default function WTB(props) {
  return (
    <div>
      <h1>Want To Buy Listings</h1>
      <WTBListings />
    </div>
  );
}
