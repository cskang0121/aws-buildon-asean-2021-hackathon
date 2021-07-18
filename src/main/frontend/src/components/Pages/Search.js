import React, { useState, useEffect } from "react";
import { Button, Tab, Nav } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import { useHistory, useLocation } from "react-router";
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
    WTBService.getSearchListings(
      props.keyword,
      props.categoryName,
      props.hashtags
    ).then((res) => {
      console.log(res.data);
      console.log(props.hashtags);
      setListings(res.data);
    });
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

  const location = useLocation();

  useEffect(() => {
    setSearchTerm(location.state.keyword);
  }, [location.state.keyword]);

  const changeSelectOptionHandler = (event) => {
    setSelectedListingType(event.target.value);
  };
  return (
    <div>
      <NavigationBar />
      <Tab.Container defaultActiveKey="ifs">
        <div className="row">
          <Nav fill variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="ifs">Items for Sale</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="wtb">Want to Buy</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <Tab.Content>
          <Tab.Pane eventKey="ifs">
            <div className="row d-flex">
              <div className="col-3">
                <h1>Search</h1>
                <Select
                  options={categoryDropdownOptions}
                  onChange={(value) => {
                    setCategoryName(value.value);
                  }}
                />
                <div className="col-9">
                  <p>Test</p>
                  <IFSListings
                    keyword={searchTerm}
                    categoryName={categoryName}
                  />
                </div>
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="wtb">
            <h1>Search</h1>
            <div style={{ width: 600 }}>
              <Select
                options={categoryDropdownOptions}
                onChange={(value) => {
                  setCategoryName(value.value);
                }}
              />
            </div>
            <div className="ui search mt ml-3">
              <div className="ui icon input my-2 my-lg-0">
                {/* <input
              type="text"
              placeholder="Search WTB Listings"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            ></input> */}
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
            <WTBListings
              keyword={searchTerm}
              categoryName={categoryName}
              hashtags={hashtags}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
