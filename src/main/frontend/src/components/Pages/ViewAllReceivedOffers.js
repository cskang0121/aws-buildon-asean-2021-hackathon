import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import OfferService from "../../services/OfferService";
import NavigationBar from "../Navbar/NavigationBar";
import UserService from "../../services/UserService";

const OfferList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = () => {
    OfferService.getCurrentUserReceivedOffers(
      UserService.getProfile().uid
    ).then((res) => {
      console.log(res.data);
      setOffers(res.data);
    });
  };

  //   function deleteWTB(listing) {
  //     WTBService.postDeleteWTB(listing).then((res) => {
  //       fetchListings();
  //     });
  //   }

  // function editWTB(listing) {
  //   WTBService.postEditWTB(listing);
  // }

  const rejectOffer = (offer) => {
    let rejectedOffer = {
      buyer: offer.buyer,
      ifsListing: offer.ifsListing,
      offeredPrice: offer.offeredPrice,
      dateOfOffer: offer.dateOfOffer,
      status: "r",
    };

    OfferService.postOffer(rejectedOffer).then((res) => {
      let newOffers = [...offers];
      const indexOfRejected = newOffers.indexOf(offer);
      newOffers.splice(indexOfRejected, 1, res.data);
      setOffers(newOffers);
    });
  };

  const acceptOffer = (offer) => {
    let acceptedOffer = {
      buyer: offer.buyer,
      ifsListing: offer.ifsListing,
      offeredPrice: offer.offeredPrice,
      dateOfOffer: offer.dateOfOffer,
      status: "a",
    };

    OfferService.postOffer(acceptedOffer).then((res) => {
      let newOffers = [...offers];
      const indexOfAccepted = newOffers.indexOf(offer);
      newOffers.splice(indexOfAccepted, 1, res.data);
      setOffers(newOffers);
    });
  };

  return offers.map((offer, index) => {
    if (offer.status === "p") {
      // Make something less ugly lmao
      return (
        <div>
          <p>
            {offer.buyer.username} offered you {offer.offeredPrice} for your
            item:
          </p>
          <h2>{offer.ifsListing.title}</h2>
          <p>Date: {offer.dateOfOffer}</p>
          <p>
            <Button>Accept Offer</Button>
            <Button
              onClick={() => {
                rejectOffer(offer);
              }}
            >
              Reject Offer
            </Button>
          </p>
        </div>
      );
    }
  });
};

export default function ViewAllReceivedOffers(props) {
  return (
    <div>
      <NavigationBar />
      <h1>Received Offers</h1>
      <OfferList />
    </div>
  );
}
