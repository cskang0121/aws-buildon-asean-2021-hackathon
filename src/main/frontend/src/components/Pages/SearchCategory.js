import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import WTBService from "../../services/WTBService";
import IFSService from "../../services/IFSService";
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
  }, [props.keyword]);

  return listings.map((listing, index) => {
    const wtbDetails = (listing) => {
      history.push({
        pathname: "/wtb-listing-details",
        state: { listing: listing },
      });
    };
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

const IFSListings = (props) => {
  const [listings, setListings] = useState([]);
  const history = useHistory();

  const fetchListings = () => {
    IFSService.getSearchListings(props.keyword).then((res) => {
      console.log(res.data);
      setListings(res.data);
    });
  };

  useEffect(() => {
    fetchListings();
  }, [props.keyword]);

  return listings.map((listing, index) => {
    const ifsDetails = (listing) => {
      history.push({
        pathname: "/ifs-listing-details",
        state: { listing: listing },
      });
    };
    return (
      <div onClick={() => ifsDetails(listing)}>
        <h2>{listing.title}</h2>
        <p>{listing.description}</p>
        <p>
          Price: {listing.price}
        </p>
      </div>
    );
  });
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("");

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  if (selected == "wtb") {
    return (
      <div>
        <NavigationBar />
        <div>
            <select onChange={changeSelectOptionHandler}>
              <option selected value="ifs">Items for Sale Listings</option>
              <option value="wtb">Want to Buy Listings</option>
            </select>
        </div>
        {/* <h1>Search</h1>
        <div className="ui search">
          <div className="ui icon input">
            <input
              type="text"
              placeholder="Search WTB Listings"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            ></input>
          </div>
        </div> */}
  
        <h2>Want To Buy Listings</h2>
        <WTBListings keyword={searchTerm} />
      </div>
    );
  } else {
    return (
      <div>
        <NavigationBar />
        <div>
            <select onChange={changeSelectOptionHandler}>
              <option selected value="ifs">Items for Sale Listings</option>
              <option value="wtb">Want to Buy Listings</option>
            </select>
        </div>
        <h1>Search</h1>
        <div className="ui search">
          <div className="ui icon input">
            <input
              type="text"
              placeholder="Search IFS Listings"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            ></input>
          </div>
        </div>
  
        <h2>Items for Sale Listings</h2>
        <IFSListings keyword={searchTerm} />
      </div>
    );
  }

}
