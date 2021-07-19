import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import WTBService from "../../services/WTBService";
import NavigationBar from "../Navbar/NavigationBar";
import UserService from "../../services/UserService";

export default function WTB(props) {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  const makeDeal = (listing) => {
    history.push({
      pathname: "/deal",
      state: { listing: listing }
      });
  };

  const viewDeal = (listing) => {
    history.push({
      pathname: "/view-listing-deals",
      state: { listing: listing },
    });
  };

  const toggleButton = () => {
    return location.state.listing.user.uid === user.uid ? (
      <div className="text-center">
        <Button className="text-center" onClick={() => viewDeal(location.state.listing)}>
          View Deals
        </Button>
      </div>
    ) : (
      <div className="text-center">
        <Button onClick={() => makeDeal(location.state.listing)}>
        Propose Deal
        </Button>
      </div>
    );
  };

  return (

    <div>
      <NavigationBar />
      {/* <h1 className="ml-4 mt-4 mb-4">Listing</h1> */}
      
      <h2 className="m-4 text-center">{location.state.listing.title}</h2>
      <p className="ml-5 mr-5 text-justify">{location.state.listing.description}</p>
      <p className="text-center">
        <b>Asking Price:</b> S${location.state.listing.priceLower} - {location.state.listing.priceUpper}
      </p>
      {toggleButton()}
    </div>
  );
}
