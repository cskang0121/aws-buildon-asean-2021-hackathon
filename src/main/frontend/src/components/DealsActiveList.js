import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import DealService from "../services/DealService";
import UserService from "../services/UserService";

const styles = {
  container: {
    boxShadow: "2px 9px 16px 0px rgba(0,0,0,0.25)",
    padding: "2%",
    marginTop: 20,
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

export default function DealsActiveList(props) {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = () => {
    if (props.status === "ongoing" && props.origin === "received") {
      DealService.getCurrentUserReceivedAcceptedDeals(
        UserService.getProfile().uid
      ).then((res) => {
        const array = res.data.filter(
          (deal) =>
            deal.status === "a" || deal.status === "1" || deal.status === "2"
        );
        setDeals(array);
      });
    } else if (props.status === "ongoing" && props.origin === "made") {
      DealService.getCurrentUserDealsMade(UserService.getProfile().uid).then(
        (res) => {
          const array = res.data.filter(
            (deal) =>
              deal.status === "a" || deal.status === "1" || deal.status === "2"
          );
          setDeals(array);
        }
      );
    } else if (props.status === "pending" && props.origin === "made") {
      DealService.getCurrentUserDealsMade(UserService.getProfile().uid).then(
        (res) => {
          const array = res.data.filter((deal) => deal.status === "p");
          setDeals(array);
        }
      );
    }
  };

  const confirmTransaction = (deal) => {
    let confirmedDeal = { ...deal };
    if (deal.status === "a") {
      if (props.origin == "received") {
        confirmedDeal.status = "2";
      } else if (props.origin == "made") {
        confirmedDeal.status = "1";
      }
    } else if (deal.status == "1" && props.origin == "received") {
      confirmedDeal.status = "c";
    } else if (deal.status == "2" && props.origin == "made") {
      confirmedDeal.status = "c";
    }

    DealService.postConfirmDeal(confirmedDeal).then((res) => {
      fetchDeals();
    });
  };

  const confirmButton = (deal) => {
    if (deal.status === "a") {
      return (
        <Button
          size="lg"
          variant="primary"
          onClick={() => {
            confirmTransaction(deal);
          }}
        >
          Confirm
        </Button>
      );
    } else if (deal.status == "1") {
      if (props.origin == "received") {
        return (
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              confirmTransaction(deal);
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
    } else if (deal.status == "2") {
      if (props.origin == "made") {
        return (
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              confirmTransaction(deal);
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

  const statusMessage = (deal) => {
    if (deal.status === "a") {
      return (
        <span style={styles.paragraph}>
          Status: Accepted, please confirm transaction once complete
        </span>
      );
    } else if (deal.status == "1") {
      if (props.origin == "received") {
        return (
          <span style={styles.paragraph}>
            Status: Awaiting your confirmation
          </span>
        );
      } else if (props.origin == "made") {
        return (
          <span style={styles.paragraph}>
            Status: Confirmed, awaiting {deal.wtbId.user.username}'s
            confirmation
          </span>
        );
      }
    } else if (deal.status == "2") {
      if (props.origin == "made") {
        return (
          <span style={styles.paragraph}>
            Status: Awaiting your confirmation
          </span>
        );
      } else if (props.origin == "received") {
        return (
          <span style={styles.paragraph}>
            Status: Confirmed, awaiting {deal.seller.username}'s confirmation
          </span>
        );
      }
    }
  };

  return deals.map((deal, index) => {
    return (
      <div key={index} className="row" style={styles.container}>
        <div className="col-9" style={styles.textDiv}>
          <span style={styles.paragraph}>
            You proposed a deal to {deal.wtbId.user.username}'s request:
          </span>
          <span style={styles.itemName}>{deal.wtbId.title}</span>
          <span style={styles.paragraph}>Item: {deal.ifsId.title}</span>
          <span style={styles.paragraph}>
            Date: {new Date(deal.dateOfDeal).toLocaleDateString("en-gb")}
          </span>
          {statusMessage(deal)}
        </div>
        <div className="col-3" style={styles.buttons}>
          {confirmButton(deal)}
        </div>
      </div>
    );
  });
}
