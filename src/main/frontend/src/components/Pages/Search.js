import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import WTBService from "../../services/WTBService";
import NavigationBar from "../Navbar/NavigationBar";

const WTBListings = (props) => {
  const [listings, setListings] = useState([]);
  const history = useHistory();

  const fetchListings = () => {
    WTBService.getSearchListings(props.keyword).then((res) => {
      console.log(res.data);
      setListings(res.data);
    });
  };

  useEffect(() => {
    fetchListings();
  }, [listings]);

  return listings.map((listing, index) => {
    const wtbDetails = (listing) => {
    history.push({
      pathname: "/wtb-listing-details",
      state: {listing: listing}
    });
  };
    // Make something less ugly lmao
    return (
      <div onClick={() => wtbDetails(listing)}>
        <h2>{listing.title}</h2>
        <p>{listing.description}</p>
        <p>
          Price: {listing.priceLower} - {listing.priceUpper}
        </p>
      </div>
    );
  });
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
        <NavigationBar />
        <h1>Search</h1>
        <div className="ui search">
          <div className="ui icon input">
            <input type="text" placeholder="Search WTB Listings" onChange={event => {setSearchTerm(event.target.value)}}></input>
          </div>
        </div>

        <h2>Want To Buy Listings</h2>
        <WTBListings keyword={searchTerm}/>
    </div>
  )
}