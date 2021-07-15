import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import WTBService from "../../services/WTBService";
import IFSService from "../../services/IFSService";
import NavigationBar from "../Navbar/NavigationBar";
import { categoryDropdownOptions } from "../../util/categories";
import Select from "react-select";

const WTBListings = (props) => {
  const [listings, setListings] = useState([]);
  const history = useHistory();

  const fetchListings = () => {
    WTBService.getSearchListings(props.keyword, props.categoryName).then(
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

  const changeSelectOptionHandler = (event) => {
    setSelectedListingType(event.target.value);
  };

  if (selectedListingType === "wtb") {
    return (
      <div>
        <NavigationBar />
        <div>
          <select onChange={changeSelectOptionHandler}>
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
        </div>

        <h2>Want To Buy Listings</h2>
        <WTBListings keyword={searchTerm} categoryName={categoryName} />
      </div>
    );
  } else {
    return (
      <div>
        <NavigationBar />
        <div>
          <select onChange={changeSelectOptionHandler}>
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
        <IFSListings keyword={searchTerm} categoryName={categoryName} />
      </div>
    );
  }
}
