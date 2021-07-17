import React, { useState, useEffect } from "react";
import Select from "react-select";

import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import { useHistory } from "react-router";

import IFSService from "../services/IFSService";
import UserService from "../services/UserService";

import { categoryDropdownOptions } from "../util/categories";

export default function CreateIFS(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [isDeliveryMeet, setIsDeliveryMeet] = useState(false);
  const [isDeliveryDeliver, setIsDeliveryDeliver] = useState(false);
  const [isPaymentCash, setIsPaymentCash] = useState(false);
  const [isPaymentPayNow, setIsPaymentPayNow] = useState(false);

  const history = useHistory();

  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  //for itemCondition
  const itemConditionRadios = [
    { name: 'Brand New', value: 'Brand New' },
    { name: 'Like New', value: 'Like New' },
    { name: 'Well Used', value: 'Well Used' },
    { name: 'Heavily Used', value: 'Heavily Used' },
  ];

  const handleMeetChange = () => {
    setIsDeliveryMeet(!isDeliveryMeet);
  }

  const handleDeliverChange = () => {
    setIsDeliveryDeliver(!isDeliveryDeliver);
  }

  const handleCashChange = () => {
    setIsPaymentCash(!isPaymentCash);
  }

  const handlePayNowChange = () => {
    setIsPaymentPayNow(!isPaymentPayNow);
  }

  const createListing = (e) => {
    e.preventDefault();
    let listing = {
      title: title,
      description: description,
      picUri: null,
      price: price,
      status: "a",
      listingType: props.listingType,
      categoryName: categoryName,
      user: user,
      hashtags: hashtags,
      itemCondition: itemCondition,
      isDeliveryMeet: isDeliveryMeet,
      isDeliveryDeliver: isDeliveryDeliver,
      isPaymentCash: isPaymentCash,
      isPaymentPayNow: isPaymentPayNow,
    };

    IFSService.postIFSListing(listing).then((res) => {
      if (props.listingType === "s") {
        history.push({
          pathname: "/my-listings",
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
                  <InputGroup.Text>Hashtags:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  autoComplete="off"
                  type="text"
                  name="description"
                  value={hashtags}
                  onChange={(event) => setHashtags(event.target.value)}
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
          <h5>Category</h5>
          <div style={{ width: 600 }}>
            <Select
              options={categoryDropdownOptions}
              onChange={(value) => {
                setCategoryName(value.value);
              }}
            />
          </div>
          <div>
          <h5>Item Condition</h5>
          <ButtonGroup>
            {itemConditionRadios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={'radio-${idx}'}
                type="radio"
                variant={'outline-primary'}
                name="radio"
                value={radio.value}
                checked={itemCondition === radio.value}
                onChange={(e) => setItemCondition(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          </div>
          <div>
            <h5>Delivery Method</h5>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Meet-up" onChange={(event) => handleMeetChange()}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Delivery" onChange={(event) => handleDeliverChange()}/>
            </Form.Group>
          </div>
          <div>
            <h5>Payment Method</h5>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Cash on Meet-up" onChange={(event) => handleCashChange()}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="PayNow" onChange={(event) => handlePayNowChange()}/>
            </Form.Group>
          </div>
          <Button onClick={createListing}> Submit </Button>
        </Col>
      </Row>
    </div>
  );
}
