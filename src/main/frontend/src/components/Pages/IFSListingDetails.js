import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import IFSService from "../../services/IFSService";
import NavigationBar from "../Navbar/NavigationBar";
import UserService from "../../services/UserService";
import DealService from "../../services/DealService";
import BuyerQnAList from "../BuyerQnAList";

export default function IFSListing(props) {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  // Lead to QnA
  const viewSellerQnA = (listing) => {
    history.push({
      pathname: "/view-seller-qna",
      state: { listing: listing },
    });
  };

  const answerSellerQnA = (listing) => {
    history.push({
      pathname: "/answer-seller-qna",
      state: { listing: listing },
    });
  };

  // Lead to Offer

  const makeOffer = (listing) => {
    history.push({
      pathname: "/offer",
      state: { listing: listing },
    });
  };

  const viewOffer = (listing) => {
    history.push({
      pathname: "/view-listing-offers",
      state: { listing: listing },
    });
  };

  // Deal-related stuff
  const isDealEmpty = (value) => {
    return (
      Object.prototype.toString.call(value) === "[object Object]" &&
      JSON.stringify(value) === "{}"
    );
  };

  const rejectDeal = (deal) => {
    let rejectedDeal = {
      seller: deal.seller,
      ifsId: deal.ifsId,
      wtbId: deal.wtbId,
      dateOfDeal: deal.dateDate,
      status: "r",
    };

    DealService.postDeal(rejectedDeal).then((res) => {
      history.push({
        pathname: "/view-listing-deals",
        state: { listing: res.data.wtbId },
      });
    });
  };

  // Utility function to merge arrays
  function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (
          a[i].wtbId.wtbId === a[j].wtbId.wtbId &&
          a[i].ifsId.ifsId === a[j].ifsId.ifsId &&
          a[i].seller.uid == a[j].seller.uid
        )
          a.splice(j--, 1);
      }
    }

    return a;
  }

  const acceptDeal = (deal) => {
    // Create identical deal but set to status "a"
    const acceptedDeal = {
      seller: deal.seller,
      ifsId: deal.ifsId,
      wtbId: deal.wtbId,
      dateOfDeal: deal.dateOfDeal,
      status: "a",
    };

    let arr1 = [deal];

    // Get all deals with WTB Listing = current WTB listing
    DealService.getDealsForWtbListing(deal.wtbId.wtbId)
      .then((res) => {
        let arr2 = [...arr1, ...res.data];
        return arr2;
      })
      // Get all deals with IFS Listing = current IFS listing
      .then((arr2) => {
        DealService.getDealsForIfsListing(deal.ifsId.ifsId)
          .then((res) => {
            let arr3 = arrayUnique([...arr2, ...res.data]);
            arr3.map((o, index, arr) => {
              arr[index] = {
                seller: o.seller,
                ifsId: o.ifsId,
                wtbId: o.wtbId,
                dateOfDeal: o.dateOfDeal,
                status: "r",
              };
            });
            arr3[0] = acceptedDeal;
            console.log(arr3);
            return arr3;
          })
          .then((arr3) => {
            DealService.postAcceptedDeals(arr3).then((res) => {
              console.log(res.data);
              history.push({
                pathname: "/my-listings",
              });
            });
          });
      });
  };

  // Button toggle
  const toggleButton = () => {
    if (!isDealEmpty(location.state.deal)) {
      return (
        <div>
          <BuyerQnAList deal={location.state.deal} />
          <Button onClick={(event) => acceptDeal(location.state.deal)}>
            Accept Deal
          </Button>
          <Button onClick={(event) => rejectDeal(location.state.deal)}>
            Reject Deal
          </Button>
        </div>
      );
    } else if (location.state.listing.user.uid === user.uid) {
      return (
        <div>
          <Button onClick={() => answerSellerQnA(location.state.listing)}>
            View QnA
          </Button>
          <Button onClick={() => viewOffer(location.state.listing)}>
            View Offers
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={() => viewSellerQnA(location.state.listing)}>
            View QnA
          </Button>
          <Button onClick={() => makeOffer(location.state.listing)}>
            Make Offer
          </Button>
        </div>
      );
    }
  };

  const getImage = (listing) => {
    IFSService.getListingImage(listing.ifsId).then((res) => {
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
      <p>Price: {location.state.listing.price}</p>
      {toggleButton()}
    </div>
  );
}
