import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import IFSService from "../../services/IFSService";
import NavigationBar from "../Navbar/NavigationBar";
import UserService from "../../services/UserService";
import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
} from "../../util/reusableUtils";

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
      setImgSrc("data:image/jpg;base64," + res.data);
    });
  };

  return (
    <div key={index}>
      {listing.picUri ? <img src={imgSrc} /> : <p>No image found</p>}
      <h2>{listing.title}</h2>
      <p>{listing.description}</p>
      <p>Price: {listing.price}</p>
      <p>
        <Button onClick={() => ifsDetails(listing)}>View Details</Button>
      </p>
      <p>
        <Button onClick={() => deleteIFS(listing)}>Delete Listing</Button>
      </p>
    </div>
  );
};
const IFSListings = () => {
  const [listings, setListings] = useState([]);
  
  const [imgSrc, setImgSrc] = useState("");

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
      <h1>Item For Sale Listings</h1>
      <IFSListings />
    </div>
  );
}
