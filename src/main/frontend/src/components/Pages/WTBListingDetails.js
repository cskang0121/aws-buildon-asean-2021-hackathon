import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import {
  FaBoxOpen,
  FaHandHoldingUsd,
  FaLocationArrow,
  FaRegCommentDots,
} from "react-icons/fa";
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
      state: { listing: listing },
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
      <div className="d-flex flex-column">
        <Button
          size="lg"
          className="m-2"
          onClick={() => viewDeal(location.state.listing)}
        >
          View Deals
        </Button>
      </div>
    ) : (
      <div className="d-flex flex-column">
        <Button
          className="mx-2"
          size="lg"
          variant="outline-primary"
          onClick={(event) => chat(event, location.state.listing)}
        >
          <FaRegCommentDots /> Chat with {location.state.listing.user.username}
        </Button>
        <Button
          size="lg"
          className="m-2"
          onClick={() => makeDeal(location.state.listing)}
        >
          Propose Deal
        </Button>
      </div>
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

  const getDeliveryMethod = (listing) => {
    if (listing.isPreferredDeliveryDeliver && listing.isPreferredDeliveryMeet) {
      return `Delivery, Meet Up (${location.state.listing.preferredMeetUpLocation})`;
    } else if (listing.isPreferredDeliveryDeliver) {
      return "Delivery";
    } else if (listing.isPreferredDeliveryMeet) {
      return `Meet Up (${location.state.listing.preferredMeetUpLocation})`;
    }
  };

  const getPaymentMethod = (listing) => {
    if (listing.isPreferredPaymentCash && listing.isPreferredPaymentPayNow) {
      return "PayNow, Cash";
    } else if (listing.isPreferredPaymentCash) {
      return "Cash";
    } else if (listing.isPreferredPaymentPayNow) {
      return "PayNow";
    }
  };

  const chat = (e, listing) => {
    e.preventDefault();
    history.push({
      pathname: "/chat",
      state: { otherUser: listing.user },
    });
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="row shadow-lg p-5 mt-5">
          <div
            className="col-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {location.state.listing.picUri && imgSrc ? (
              <img
                className="rounded"
                style={{ height: 500, width: 500, objectFit: "cover" }}
                src={imgSrc}
              />
            ) : (
              <p className="text-center">No image found</p>
            )}
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-9">
                <h2>{location.state.listing.title}</h2>
              </div>
              <div className="col-3">
                <h4>
                  <span className="badge badge-pill badge-info">Buying</span>
                </h4>
              </div>
            </div>
            <div className="row">
              <h3>
                S${location.state.listing.priceLower} -{" "}
                {location.state.listing.priceUpper}
              </h3>
            </div>
            <div className="row">
              <div className="col-3">
                <p>
                  <FaBoxOpen style={{ color: "#5A189A" }} />{" "}
                  {location.state.listing.preferredItemCondition}
                </p>
              </div>
              <div className="col-5">
                <p>
                  <FaLocationArrow style={{ color: "#5A189A" }} />{" "}
                  {getDeliveryMethod(location.state.listing)}
                </p>
              </div>
              <div className="col-4">
                <p>
                  <FaHandHoldingUsd style={{ color: "#5A189A" }} />{" "}
                  {getPaymentMethod(location.state.listing)}
                </p>
              </div>
            </div>
            <div className="row  pt-2 pb-2 border-top border-bottom">
              <b>Description</b>
              <p>{location.state.listing.description}</p>
            </div>
            <div className="row mt-2">{toggleButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
