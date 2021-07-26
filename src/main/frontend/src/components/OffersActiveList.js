import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
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

export default function OffersActiveList(props) {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = () => {
    if (props.status === "ongoing" && props.origin === "received") {
      OfferService.getCurrentUserReceivedOffers(
        UserService.getProfile().uid
      ).then((res) => {
        console.log(res.data);
        const array = res.data.filter(
          (offer) =>
            offer.status === "a" || offer.status === "1" || offer.status === "2"
        );
        setOffers(array);
      });
    } else if (props.status === "ongoing" && props.origin === "made") {
      OfferService.getCurrentUserOffersMade(UserService.getProfile().uid).then(
        (res) => {
          const array = res.data.filter(
            (offer) =>
              offer.status === "a" ||
              offer.status === "1" ||
              offer.status === "2"
          );
          setOffers(array);
        }
      );
    } else if (props.status === "pending" && props.origin === "made") {
      OfferService.getCurrentUserOffersMade(UserService.getProfile().uid).then(
        (res) => {
          const array = res.data.filter((offer) => offer.status === "p");
          setOffers(array);
        }
      );
    }
  };

  const confirmTransaction = (offer) => {
    let confirmedOffer = { ...offer };
    if (offer.status === "a") {
      if (props.origin == "received") {
        confirmedOffer.status = "2";
      } else if (props.origin == "made") {
        confirmedOffer.status = "1";
      }
    } else if (offer.status == "1" && props.origin == "received") {
      confirmedOffer.status = "c";
    } else if (offer.status == "2" && props.origin == "made") {
      confirmedOffer.status = "c";
    }

    OfferService.postConfirmOffer(confirmedOffer).then((res) => {
      fetchOffers();
    });
  };

  const confirmButton = (offer) => {
    if (offer.status === "a") {
      return (
        <Button
          size="lg"
          variant="primary"
          onClick={() => {
            confirmTransaction(offer);
          }}
        >
          Confirm
        </Button>
      );
    } else if (offer.status == "1") {
      if (props.origin == "received") {
        return (
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              confirmTransaction(offer);
            }}
          >
            Confirm
          </Button>
        );
      } else if (props.origin == "made") {
        return (
          <Button size="lg" disabled variant="secondary">
            Confirm
          </Button>
        );
      }
    } else if (offer.status == "2") {
      if (props.origin == "made") {
        return (
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              confirmTransaction(offer);
            }}
          >
            Confirm
          </Button>
        );
      } else if (props.origin == "received") {
        return (
          <Button size="lg" disabled variant="secondary">
            Confirm
          </Button>
        );
      }
    }
  };

  const statusMessage = (offer) => {
    if (offer.status === "a") {
      return (
        <span style={styles.paragraph}>
          Status: Accepted, please confirm transaction once complete
        </span>
      );
    } else if (offer.status == "1") {
      if (props.origin == "received") {
        return (
          <span style={styles.paragraph}>
            Status: Accepted, please confirm transaction once complete
          </span>
        );
      } else if (props.origin == "made") {
        return (
          <span style={styles.paragraph}>
            Status: Confirmed, awaiting {offer.ifsListing.user.username}'s
            confirmation
          </span>
        );
      }
    } else if (offer.status == "2") {
      if (props.origin == "made") {
        return (
          <span style={styles.paragraph}>
            Status: Accepted, please confirm transaction once complete
          </span>
        );
      } else if (props.origin == "received") {
        return (
          <span style={styles.paragraph}>
            Status: Confirmed, awaiting {offer.buyer.username}'s confirmation
          </span>
        );
      }
    }
  };

  return offers.map((offer, index) => {
    return (
      <div key={index} className="row" style={styles.container}>
        <div className="col-9" style={styles.textDiv}>
          <span style={styles.paragraph}>
            You made an offer on {offer.ifsListing.user.username}'s item:
          </span>
          <span style={styles.itemName}>{offer.ifsListing.title}</span>
          <span style={styles.paragraph}>Offer: ${offer.offeredPrice}</span>
          <span style={styles.paragraph}>
            Date: {new Date(offer.dateOfOffer).toLocaleDateString("en-gb")}
          </span>
          {statusMessage(offer)}
        </div>
        <div className="col-3" style={styles.buttons}>
          {confirmButton(offer)}
        </div>
      </div>
    );
  });
}
