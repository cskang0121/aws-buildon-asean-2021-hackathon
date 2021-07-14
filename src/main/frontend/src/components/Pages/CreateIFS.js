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

import IFSService from "../../services/IFSService";
import UserService from "../../services/UserService";

export default function CreateIFS(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const history = useHistory();

  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  const createListing = (e) => {
    e.preventDefault();
    let listing = {
      title: title,
      description: description,
      picUri: null,
      price: price,
      status: "a",
      listingType: props.listingType,
      categoryName: null,
      user: user,
    };

    IFSService.postIFSListing(listing).then((res) => {
      if (props.listingType === "s") {
        history.push({
          pathname: "/ifs",
        });
      } else {
        props.setDeal(res.data, e);
      }
    });
  };

  return (
    <div>
      <Row className="justify-content-md-center">
        <Col lg={12}>
          <Form.Row>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Title:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  autoComplete="off"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Description:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  autoComplete="off"
                  type="text"
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Price:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Button onClick={createListing}> Submit </Button>
        </Col>
      </Row>
    </div>
  );
}
