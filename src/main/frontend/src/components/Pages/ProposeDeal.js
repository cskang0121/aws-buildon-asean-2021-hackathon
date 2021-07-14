import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import { useHistory, useLocation } from "react-router";
import NavigationBar from "../Navbar/NavigationBar";

import DealService from "../../services/DealService";
import UserService from "../../services/UserService";
import IFSService from "../../services/IFSService";

function UseExistingListing({ user, setIfsListing }) {
  const [listings, setListings] = useState([]);

  const fetchListings = () => {
    console.log(user);
    IFSService.getCurrentUserIFSListings(user.uid).then((res) => {
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
        <p>Price: {listing.price}</p>
        <p>
          <Button onClick={setIfsListing(listing)}>Select Listing</Button>
        </p>
      </div>
    );
  });
}

export default function ProposeDeal(props) {
  const history = useHistory();
  const location = useLocation();

  const [priceToSellFor, setPriceToSellFor] = useState(0);
  const [useExistingListing, setUseExistingListing] = useState("");
  const [ifsListing, setIfsListing] = useState({});

  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(UserService.getProfile());
    console.log(location.state.listing);
  }, []);

  const createDeal = (e) => {
    e.preventDefault();
    let deal = {
      seller: user,
      wtbId: location.state.listing,
      ifsId: ifsListing,
      priceToSellFor: priceToSellFor,
      dateOfDeal: null,
    };

    DealService.postDeal(deal).then((res) => {
      history.push({
        pathname: "/home",
      });
    });
  };

  const showFormOrList = () => {
    switch (useExistingListing) {
      case "Y":
        return (
          <div>
            <h1>Use existing listing</h1>
            <UseExistingListing user={user} setIfsListing={setIfsListing} />
            <Button onClick={createDeal}> Submit </Button>
          </div>
        );
      case "N":
        return <h1>Create new listing</h1>;
      default:
        return (
          <div>
            <Button onClick={(event) => setUseExistingListing("Y")}>
              Use Existing Listing
            </Button>
            <Button onClick={(event) => setUseExistingListing("N")}>
              Create New Listing
            </Button>
          </div>
        );
    }
  };

  return (
    <div>
      <NavigationBar />
      <h1>Propose Deal for:</h1>
      <h2>{location.state.listing.title}</h2>
      {showFormOrList()}
      {/* {<Row className="justify-content-md-center">
        <Col lg={12}>
          <Form.Row>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Proposed Price:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="priceToSellFor"
                  value={priceToSellFor}
                  onChange={(event) => setPriceToSellFor(event.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Button onClick={createDeal}> Submit </Button>
        </Col>
      </Row>} */}
    </div>
  );
}
