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
      return ([
        <div>
          <BuyerQnAList deal={location.state.deal} />
        </div>,
        <div className="text-center">
          <Button className="mr-5 btn btn-success" onClick={(event) => acceptDeal(location.state.deal)}>
            Accept Deal
          </Button>
          <Button className="ml-5 btn btn-danger" onClick={(event) => rejectDeal(location.state.deal)}>
            Reject Deal
          </Button>
        </div>
      ]
      );
    } else if (location.state.listing.user.uid === user.uid) {
      return (
        <div className="d-flex flex-column">
          <Button
            size="lg"
            className="m-2"
            onClick={() => answerSellerQnA(location.state.listing)}
          >
            View QnA
          </Button>
          <Button
            size="lg"
            className="m-2"
            onClick={() => viewOffer(location.state.listing)}
          >
            View Offers
          </Button>
        </div>
      );
    } else {
      return (
        <div className="d-flex flex-column">
          <Button
            size="lg"
            className="m-2"
            onClick={() => viewSellerQnA(location.state.listing)}
          >
            View QnA
          </Button>
          <Button
            size="lg"
            className="m-2"
            onClick={() => makeOffer(location.state.listing)}
          >
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
                  <span className="badge badge-pill badge-info">Selling</span>
                </h4>
              </div>
            </div>
            <div className="row">
              <h3>S${location.state.listing.price}</h3>
            </div>
            <div className="row">
              <div className="col-4">
                <p>{location.state.listing.itemCondition}</p>
              </div>
              <div className="col-4">
                <p>Delivery Method</p>
              </div>
              <div className="col-4">
                <p>Location</p>
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
