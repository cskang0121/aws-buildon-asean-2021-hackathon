import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import { useHistory } from "react-router";
import NavigationBar from "../Navbar/NavigationBar";

import WTBService from "../../services/WTBService";
import UserService from "../../services/UserService";

export default function Offer(props) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priceLower, setPriceLower] = useState(0);
//   const [priceUpper, setPriceUpper] = useState(0);

//   const history = useHistory();

//   const [user, setUser] = useState({});

//   useEffect(() => {
//     UserService.getProfile().then((res) => setUser(res.data));
//     console.log(user);
//   }, []);

//   const createOffer = (e) => {
//     e.preventDefault();
//     let offer = {
//       title: title,
//       description: description,
//       picUri: null,
//       priceLower: priceLower,
//       priceUpper: priceUpper,
//       status: "a",
//       categoryName: null,
//       uid: null,
//     };

//     WTBService.postWTBListing(listing).then((res) => {
//       history.push({
//         pathname: "/wtb",
//       });
//     });
//   };

  return (
    <div>
      <NavigationBar />
      <h1>offer stuff</h1>
      {/* <Row className="justify-content-md-center">
        <Col lg={12}>
          <Form.Row>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Price Upper:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="priceUpper"
                  value={priceUpper}
                  onChange={(event) => setPriceUpper(event.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Button onClick={createListing}> Submit </Button>
        </Col>
      </Row> */}
    </div>
  );
}
