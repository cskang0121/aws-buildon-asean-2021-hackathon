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
        pathname: "/home",
      });
    });
  };

  return (
    <div>
      <NavigationBar />
      <h3 className="text-center m-5">How much are you offering?</h3>
      <div className="row justify-content-center m-5">
            <Form.Group>
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
      </div>
      <div className="text-center">
        <Button className="btn btn-success" onClick={createOffer}> Submit </Button>
      </div>
      
    </div>
  );
}
