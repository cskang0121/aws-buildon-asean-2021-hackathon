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
  const [imgSrc, setImgSrc] = useState("");

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
      <Button onClick={() => viewDeal(location.state.listing)}>
        View Deals
      </Button>
    ) : (
      <Button onClick={() => makeDeal(location.state.listing)}>
        Propose Deal
      </Button>
    );
  };

  const getImage = (listing) => {
    WTBService.getListingImage(listing.wtbId).then((res) => {
      const byteCode = res.data;
      const firstChar = byteCode.charAt(0);
      var dataType = "";
      if (firstChar === "/") {
        dataType = "jpg";
      } else if (firstChar === "i") {
        dataType = "png";
      } else {
        dataType = "gif";
      }
      setImgSrc("data:image/" + dataType + ";base64," + byteCode);
    });
  };

  useEffect(() => {
    getImage(location.state.listing);
  }, [location.state.listing]);

  return (

    <div>
      <NavigationBar />
      <h1>Listing</h1>

      {location.state.listing.picUri && imgSrc ? (
        <img className="card-img-top" style={{ height: 500, width: 500, objectFit: "cover"}} src={imgSrc} />
      ) : (
        <p className="text-center">No image found</p>
      )}
      
      <h2>{location.state.listing.title}</h2>
      <p>{location.state.listing.description}</p>
      <p>
        Price: {location.state.listing.priceLower} - {location.state.listing.priceUpper}
      </p>
      {toggleButton()}
    </div>
  );
}
