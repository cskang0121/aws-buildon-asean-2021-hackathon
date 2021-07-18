import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import OfferService from "../services/OfferService";
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

export default function OfferList(props) {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = () => {
    if (props.view === "all") {
      OfferService.getCurrentUserReceivedOffers(
        UserService.getProfile().uid
      ).then((res) => {
        setOffers(res.data);
      });
    } else {
      OfferService.getOffersForListing(props.view).then((res) => {
        setOffers(res.data);
      });
    }
  };

  const rejectOffer = (offer) => {
    let rejectedOffer = {
      buyer: offer.buyer,
      ifsListing: offer.ifsListing,
      offeredPrice: offer.offeredPrice,
      dateOfOffer: offer.dateOfOffer,
      status: "r",
    };

    OfferService.postOffer(rejectedOffer).then((res) => {
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
        <div className="row" style={styles.container}>
          <div className="col-9" style={styles.textDiv}>
            <span style={styles.paragraph}>
              {offer.buyer.username} offered you {offer.offeredPrice} for your
              item:
            </span>
            <span style={styles.itemName}>{offer.ifsListing.title}</span>
            <span style={styles.paragraph}>
              Date: {new Date(offer.dateOfOffer).toLocaleDateString("en-gb")}
            </span>
          </div>
          <div className="col-3" style={styles.buttons}>
            <Button
              size="lg"
              variant="primary"
              onClick={() => {
                acceptOffer(offer);
              }}
            >
              Accept Offer
            </Button>
            <Button
              size="lg"
              variant="outline-primary"
              onClick={() => {
                rejectOffer(offer);
              }}
            >
              Reject Offer
            </Button>
          </div>
        </div>
      );
    }
  });
}
