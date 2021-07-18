import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import FormControl from 'react-bootstrap/FormControl'
import { useHistory } from "react-router";
import WTBService from "../../services/WTBService";
import IFSService from "../../services/IFSService";
import NavigationBar from "../Navbar/NavigationBar";
import { categoryDropdownOptions } from "../../util/categories";
import Select from "react-select";
import UserService from "../../services/UserService";

const WTBListings = (props) => {
  const [listings, setListings] = useState([]);
  const history = useHistory();
  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  const fetchListings = () => {
    WTBService.getSearchListings(props.keyword, props.categoryName, props.hashtags).then(
      (res) => {
        console.log(res.data);
        console.log(props.hashtags);
        setListings(res.data);
      }
    );
  };

  useEffect(() => {
    fetchListings();
  }, [props.keyword, props.categoryName, props.hashtags]);

  return listings.map((listing, index) => {
    const wtbDetails = (listing) => {
      history.push({
        pathname: "/wtb-listing-details",
        state: { listing: listing },
      });
    };

    if (listing.status === "a" && listing.user.uid != user.uid)
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
  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  const fetchListings = () => {
    IFSService.getSearchListings(props.keyword, props.categoryName).then(
      (res) => {
        console.log(res.data);
        setListings(res.data);
      }
    );
  };

  useEffect(() => {
    fetchListings();
  }, [props.keyword, props.categoryName]);

  return listings.map((listing, index) => {
    const ifsDetails = (listing) => {
      history.push({
        pathname: "/ifs-listing-details",
        state: { listing: listing, deal: {} },
      });
    };

    if (
      listing.status === "a" &&
      listing.listingType === "s" &&
      listing.user.uid != user.uid
    )
      return (
        <div onClick={() => ifsDetails(listing)}>
          <h2>{listing.title}</h2>
          <p>{listing.description}</p>
          <p>Price: {listing.price}</p>
        </div>
      );
  });
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListingType, setSelectedListingType] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [hashtags, setHashtags] = useState("");

  const changeSelectOptionHandler = (event) => {
    setSelectedListingType(event.target.value);
  };

  if (selectedListingType === "wtb") {
    return (
      <div>
        <NavigationBar />
        <div>
          <select onChange={changeSelectOptionHandler}  className="custom-select my-1 mr-sm-2">
            <option selected value="ifs">
              Items for Sale Listings
            </option>
            <option value="wtb">Want to Buy Listings</option>
          </select>
        </div>
        <div style={{ width: 600 }}>
          <Select
            options={categoryDropdownOptions}
            onChange={(value) => {
              setCategoryName(value.value);
            }}
          />
        </div>
        <h1>Search</h1>
        <div className="ui search mt ml-3">
          <div className="ui icon input my-2 my-lg-0">
            <input
              type="text"
              placeholder="Search WTB Listings"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            ></input>
          </div>
        </div>

        <h4>Hashtags</h4>
        <div className="ui search">
          <div className="ui icon input">
            <input
              type="text"
              placeholder="Enter #hashtags"
              onChange={(event) => {
                setHashtags(event.target.value);
              }}
            ></input>
          </div>
        </div>

        <h2>Want To Buy Listings</h2>
        <WTBListings keyword={searchTerm} categoryName={categoryName} hashtags={hashtags} />
      </div>
    );
  } else {
    return (
      <div>
        <NavigationBar />
        <div>
          <select onChange={changeSelectOptionHandler } className="custom-select my-1 mr-sm-2">
            <option selected value="ifs">
              Items for Sale Listings
            </option>
            <option value="wtb">Want to Buy Listings</option>
          </select>

        </div>
        <div style={{ width: 600 }}>
          <Select
            options={categoryDropdownOptions}
            onChange={(value) => {
              setCategoryName(value.value);
            }}
          />
        </div>
        <h1 className="ml-3">Search</h1>
        <div className="ui search mt ml-3">
          <div className="ui icon input form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search IFS Listings"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            ></input>
          </div>
        </div>
        <h2 className="mt-4 ml-3">Items for Sale Listings</h2>
        <IFSListings keyword={searchTerm} categoryName={categoryName} />
      </div>
    );
  }
}
