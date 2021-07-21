import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import IFSService from "../../services/IFSService";
import NavigationBar from "../Navbar/NavigationBar";
import UserService from "../../services/UserService";
// import {
//   base64StringtoFile,
//   extractImageFileExtensionFromBase64,
// } from "../../util/reusableUtils";
import ListingCard from "../ListingCard";

const styles = {
  heading: {
    fontFamily: "Inter, sans-serif",
    fontSize: 30,
    fontWeight: 600,
  },
};

const IFSList = ({ listing, index, deleteIFS }) => {
  const [imgSrc, setImgSrc] = useState("");
  const history = useHistory();

  useEffect(() => {
    getImage(listing);
  }, [listing]);

  const ifsDetails = (listing) => {
    history.push({
      pathname: "/ifs-listing-details",
      state: { listing: listing, deal: {} },
    });
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

  return (
    <div key={index} className="col-3">
      <ListingCard
        listingType="IFS"
        listing={listing}
        imgSrc={imgSrc}
        deleteMyListing={() => deleteIFS(listing)}
        listingDetails={() => ifsDetails(listing)}
      />
      {/* <p>
        <Button onClick={() => deleteIFS(listing)}>Delete Listing</Button>
      </p> */}
    </div>
  );
};

const IFSListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = () => {
    IFSService.getCurrentUserIFSListings(UserService.getProfile().uid).then(
      (res) => {
        console.log(res.data);
        setListings(res.data);
      }
    );
  };

  function deleteIFS(listing) {
    IFSService.postDeleteIFS(listing).then((res) => {
      fetchListings();
    });
  }

  return listings.map((listing, index) => {
    // Make something less ugly lmao
    return <IFSList index={index} listing={listing} deleteIFS={deleteIFS} />;
  });
};

export default function IFS(props) {
  return (
    <div>
      <h1 style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 30,
        fontWeight: 600,}}
        className="ml-4 mt-4 mb-4">Your "Item For Sale" Listings</h1>
      <div className="row ml-4 mr-4">
        <IFSListings />
      </div>
    </div>
  );
}
