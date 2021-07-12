import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import IFSService from "../../services/IFSService";

const IFSListings = () => {
  const [listings, setListings] = useState([]);

  const fetchListings = () => {
    IFSService.getIFSListings().then((res) => {
      console.log(res.data);
      setListings(res.data);
    });
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return listings.map((listing, index) => {
    // Make something less ugly lmao
    return (
      <div>
        <h2>{listing.title}</h2>
        <p>{listing.description}</p>
        <p>
          Price: {listing.price}
        </p>
      </div>
    );
  });
};

export default function IFS(props) {
  const history = useHistory();
  const addIFS = () => {
    history.push({
      pathname: "/add-ifs",
    });
  };

  return (
    <div>
      <Button onClick={addIFS}>Add New</Button>
      <h1>Item For Sale Listings</h1>
      <IFSListings />
    </div>
  );
}
