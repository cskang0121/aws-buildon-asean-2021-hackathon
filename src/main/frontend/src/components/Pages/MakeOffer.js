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

import OfferService from "../../services/OfferService";
import UserService from "../../services/UserService";

export default function MakeOffer(props) {
  const history = useHistory();
  const location = useLocation();

  const [priceToBuyFor, setPriceToBuyFor] = useState(0);

  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
    console.log(location.state.listing);
  }, []);

  const createOffer = (e) => {
    e.preventDefault();
    let offer = {
      buyer: user,
      ifsListing: location.state.listing,
      offeredPrice: priceToBuyFor,
      dateOfOffer: null,
      status: "p",
    };

    OfferService.postOffer(offer).then((res) => {
      history.push({
        pathname: "/transaction-active",
      });
    });
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="row">
          <div className="col-lg-4 shadow-sm">
            <h2 className="m-4">You are making an offer for:</h2>
            <h4 className="mx-4">{location.state.listing.title}</h4>
            <hr />
            <div className="mx-4">
              <b>Posted by: </b> {location.state.listing.user.username}
            </div>
            <div className="mx-4 my-2">
              <b>Price: </b> S$ {location.state.listing.price}
            </div>
            <p className="m-4">{location.state.listing.description}</p>
            <hr />
          </div>
          <div className="col-lg-8 shadow-sm d-flex flex-column justify-content-center align-items-center p-4">
            <h3 className="text-center my-4">How much are you offering?</h3>
            <Form.Group className="my-4">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Price Offer:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="priceToBuyFor"
                  value={priceToBuyFor}
                  onChange={(event) => setPriceToBuyFor(event.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <div className="text-center my-4">
              <Button size="lg" onClick={createOffer}>
                {" "}
                Submit{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
