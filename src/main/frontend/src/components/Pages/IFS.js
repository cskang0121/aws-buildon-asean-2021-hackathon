import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import IFSService from "../../services/IFSService";
import NavigationBar from "../Navbar/NavigationBar";
import UserService from "../../services/UserService";

const IFSListings = () => {
  const [listings, setListings] = useState([]);

  const fetchListings = () => {
    IFSService.getCurrentUserIFSListings(UserService.getProfile().uid).then(
      (res) => {
        console.log(res.data);
        setListings(res.data);
      }
    );
  };

  useEffect(() => {
    fetchListings();
  }, []);

  function deleteIFS(listing) {
    IFSService.postDeleteIFS(listing);
  }

  return listings.map((listing, index) => {
    // Make something less ugly lmao
    return (
      <div>
        <h2>{listing.title}</h2>
        <p>{listing.description}</p>
        <p>Price: {listing.price}</p>
        <p>
          <Button>Edit Listing</Button>
        </p>
        <p>
          <Button onClick={() => deleteIFS(listing)}>Delete Listing</Button>
        </p>
      </div>
    );
  });
};

export default function IFS(props) {
  return (
    <div>
      <NavigationBar />
      <h1>Item For Sale Listings</h1>
      <IFSListings />
    </div>
  );
}
