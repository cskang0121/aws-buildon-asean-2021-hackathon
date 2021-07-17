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

import WTBService from "../services/WTBService";
import UserService from "../services/UserService";
import BuyerQnAService from "../services/BuyerQnAService";

import { categoryDropdownOptions } from "../util/categories";

export default function CreateWTB(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceLower, setPriceLower] = useState(0);
  const [priceUpper, setPriceUpper] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [preferredItemCondition, setPreferredItemCondition] = useState("");
  const [isPreferredDeliveryMeet, setIsPreferredDeliveryMeet] = useState(false);
  const [isPreferredDeliveryDeliver, setIsPreferredDeliveryDeliver] = useState(false);
  const [isPreferredPaymentCash, setIsPreferredPaymentCash] = useState(false);
  const [isPreferredPaymentPayNow, setIsPreferredPaymentPayNow] = useState(false);


  // QnA things
  const [qnaList, setQnaList] = useState([]);

  const handleQnAChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...qnaList];
    list[index][name] = value;
    setQnaList(list);
  };

  const handleAddQnA = () => {
    setQnaList([...qnaList, { question: "" }]);
  };

  const handleRemoveQnA = (index) => {
    const list = [...qnaList];
    list.splice(index, 1);
    setQnaList(list);
  };

    //for itemCondition
    const preferredItemConditionRadios = [
      { name: 'Brand New', value: 'Brand New' },
      { name: 'Like New', value: 'Like New' },
      { name: 'Well Used', value: 'Well Used' },
      { name: 'Heavily Used', value: 'Heavily Used' },
    ];
  
    const handleMeetChange = () => {
      setIsPreferredDeliveryMeet(!isPreferredDeliveryMeet);
    }
  
    const handleDeliverChange = () => {
      setIsPreferredDeliveryDeliver(!isPreferredDeliveryDeliver);
    }
  
    const handleCashChange = () => {
      setIsPreferredPaymentCash(!isPreferredPaymentCash);
    }
  
    const handlePayNowChange = () => {
      setIsPreferredPaymentPayNow(!isPreferredPaymentPayNow);
    }

  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  const history = useHistory();

  const createListing = (e) => {
    e.preventDefault();
    let listing = {
      title: title,
      description: description,
      picUri: null,
      priceLower: priceLower,
      priceUpper: priceUpper,
      status: "a",
      categoryName: categoryName,
      user: user,
      hashtags: hashtags,
      preferredItemCondition: preferredItemCondition,
      isPreferredDeliveryMeet: isPreferredDeliveryMeet,
      isPreferredDeliveryDeliver: isPreferredDeliveryDeliver,
      isPreferredPaymentCash: isPreferredPaymentCash,
      isPreferredPaymentPayNow: isPreferredPaymentPayNow,
    };

    WTBService.postWTBListing(listing).then((res) => {
      const buyerQnAs = [...qnaList];
      buyerQnAs.map((o, index, arr) => {
        arr[index] = {
          wtbListing: res.data,
          qnaId: index + 1,
          question: o.question,
        };
      });
      console.log(buyerQnAs);
      BuyerQnAService.postManyBuyerQnAs(buyerQnAs).then((res) => {
        history.push({
          pathname: "/my-listings",
        });
      });
    });
  };

  const renderQnAFields = () => {
    return qnaList.map((item, index) => {
      return (
        <InputGroup key={index}>
          <InputGroup.Prepend>
            <InputGroup.Text>Question:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            required
            autoComplete="off"
            type="text"
            name="question"
            value={item.question}
            onChange={(event) => handleQnAChange(event, index)}
          />
          <Button onClick={(event) => handleRemoveQnA(index)}>Remove</Button>
        </InputGroup>
      );
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
                  <InputGroup.Text>Price Lower:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="priceLower"
                  value={priceLower}
                  onChange={(event) => setPriceLower(event.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
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
          <h5>Preferred Item Condition</h5>
          <ButtonGroup>
            {preferredItemConditionRadios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={'radio-${idx}'}
                type="radio"
                variant={'outline-primary'}
                name="radio"
                value={radio.value}
                checked={preferredItemCondition === radio.value}
                onChange={(e) => setPreferredItemCondition(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          </div>
          <div>
            <h5>Preferred Delivery Method</h5>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Meet-up" onChange={(event) => handleMeetChange()}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Delivery" onChange={(event) => handleDeliverChange()}/>
            </Form.Group>
          </div>
          <div>
            <h5>Preferred Payment Method</h5>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Cash on Meet-up" onChange={(event) => handleCashChange()}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="PayNow" onChange={(event) => handlePayNowChange()}/>
            </Form.Group>
          </div>
          <Form.Row>
            <Form.Group>
              <p>QnA</p>
              {renderQnAFields()}
              <Button onClick={handleAddQnA}>Add Question</Button>
            </Form.Group>
          </Form.Row>
          <Button onClick={createListing}> Submit </Button>
        </Col>
      </Row>
    </div>
  );
}
