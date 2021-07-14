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

import WTBService from "../../services/WTBService";
import UserService from "../../services/UserService";

export default function Deal(props) {
  const history = useHistory();
  const location = useLocation();
  
  const [priceToSellFor, setPriceToSellFor] = useState(0);

  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  const createDeal = (e) => {
    e.preventDefault();
    let deal = {
      seller: user,
      wtbListingId: location.state.listing.title,
      ifsListingId: 1,
      priceToSellFor: priceToSellFor,
      dateOfDeal: null,
    };

    WTBService.postDeal(deal).then((res) => {
      history.push({
        pathname: "/wtb",
      });
    });
  };

  return (
    <div>
      <NavigationBar />
      <h1>Propose Deal for:</h1>
      <h2>{location.state.listing.title}</h2>
      <Row className="justify-content-md-center">
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
      </Row>
    </div>
  );
}
