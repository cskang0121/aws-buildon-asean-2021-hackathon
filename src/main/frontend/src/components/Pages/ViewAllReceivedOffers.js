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
      // let newOffers = [...offers];
      // const indexOfRejected = newOffers.indexOf(offer);
      // newOffers.splice(indexOfRejected, 1, res.data);
      // setOffers(newOffers);
      fetchOffers();
    });
  };

  const acceptOffer = (offer) => {
    // Filter array of offers related with that 1 ifsListing
    let acceptedOffers = offers.filter(
      (o) => o.ifsListing.ifsId === offer.ifsListing.ifsId
    );

    const indexOfAccepted = acceptedOffers.indexOf(offer);

    // Create identical offer but set to status "a"
    const acceptedOffer = {
      buyer: offer.buyer,
      ifsListing: offer.ifsListing,
      offeredPrice: offer.offeredPrice,
      dateOfOffer: offer.dateOfOffer,
      status: "a",
    };

    // Modify array so everything but that offer set to status = "r"
    acceptedOffers.map((o, index, arr) => {
      arr[index] = {
        buyer: o.buyer,
        ifsListing: o.ifsListing,
        offeredPrice: o.offeredPrice,
        dateOfOffer: o.dateOfOffer,
        status: "r",
      };
    });

    // Change the accepted offer to status "a"
    acceptedOffers[indexOfAccepted] = acceptedOffer;

    // Post ARRAY of offers
    // THEN fetchOffers again
    OfferService.postAcceptedOffers(acceptedOffers).then((res) => {
      fetchOffers();
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
            <Button
              onClick={() => {
                acceptOffer(offer);
              }}
            >
              Accept Offer
            </Button>
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
