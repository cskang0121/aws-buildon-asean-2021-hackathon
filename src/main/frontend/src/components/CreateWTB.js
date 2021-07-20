import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";

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
import { ctSubcategoryDropdownOptions } from "../util/ctSubcategories";
import { fhSubcategoryDropdownOptions } from "../util/fhSubcategories";
import { mgSubcategoryDropdownOptions } from "../util/mgSubcategories";

let tempArr = [];
let subCategoryOptions = tempArr.map((options) => {
  return { value: options, label: options };
});

const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";

function Dropzone(props) {
  const [imgSrc, setImgSrc] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const currentFile = acceptedFiles[0];
      const myFileItemReader = new FileReader();
      myFileItemReader.addEventListener(
        "load",
        () => {
          const myResult = myFileItemReader.result;
          setImgSrc(myResult);
        },
        false
      );

      myFileItemReader.readAsDataURL(currentFile);
    }
    const file = acceptedFiles[0];
    console.log(file);
    props.setFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div>
        {imgSrc != null ? (
          <div className="d-flex justify-content-center">
            <img
              style={{ width: 400, height: 400, objectFit: "cover" }}
              src={imgSrc}
            />
          </div>
        ) : (
          <div className="d-flex container border border-success rounded w-75 align-items-center justify-content-center" style={{height: 200}}>
            <p className="text-center">
              Drop your image here
            </p>
          </div>
        )}
        </div>
      ) : (
        <div>
          {imgSrc != null ? (
            <div className="d-flex justify-content-center">
              <img
                style={{ width: 400, height: 400, objectFit: "cover" }}
                src={imgSrc}
              />
            </div>
          ) : (
            <div className="d-flex container border border-success rounded w-75 align-items-center justify-content-center" style={{height: 200}}>
              <p className="text-center">
                Drag and drop an image, or click to browse files
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const MeetUpLocationField = (props) => {
  return (
    <div>
      <Form.Row>
        <Form.Group>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text className="ml-4">Preferred Meet Location:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              required
              autoComplete="off"
              type="text"
              name="preferredMeetUpLocation"
              value={props.preferredMeetUpLocation}
              onChange={(event) => props.setPreferredMeetUpLocation(event.target.value)}
            />
          </InputGroup>
        </Form.Group>
      </Form.Row>
    </div> 
  );
}

export default function CreateWTB(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceLower, setPriceLower] = useState(0);
  const [priceUpper, setPriceUpper] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [fullCategoryName, setFullCategoryName] = useState("");
  // const [hashtags, setHashtags] = useState("");
  const [preferredItemCondition, setPreferredItemCondition] = useState("");
  const [isPreferredDeliveryMeet, setIsPreferredDeliveryMeet] = useState(false);
  const [isPreferredDeliveryDeliver, setIsPreferredDeliveryDeliver] =
    useState(false);
  const [isPreferredPaymentCash, setIsPreferredPaymentCash] = useState(false);
  const [isPreferredPaymentPayNow, setIsPreferredPaymentPayNow] =
    useState(false);
  const [file, setFile] = useState({});
  const [preferredMeetUpLocation, setPreferredMeetUpLocation] = useState("");

  const history = useHistory();

  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

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
    { name: " Brand New", value: "Brand New" },
    { name: " Like New", value: "Like New" },
    { name: " Well Used", value: "Well Used" },
    { name: " Heavily Used", value: "Heavily Used" },
  ];

  const handleMeetChange = () => {
    setIsPreferredDeliveryMeet(!isPreferredDeliveryMeet);
    if (isPreferredDeliveryMeet === true) {
      setPreferredMeetUpLocation("");
    }
  };

  const handleDeliverChange = () => {
    setIsPreferredDeliveryDeliver(!isPreferredDeliveryDeliver);
  };

  const handleCashChange = () => {
    setIsPreferredPaymentCash(!isPreferredPaymentCash);
  };

  const handlePayNowChange = () => {
    setIsPreferredPaymentPayNow(!isPreferredPaymentPayNow);
  };

  const createListing = (e) => {
    e.preventDefault();
    let listing = {
      title: title,
      description: description,
      picUri: null,
      priceLower: priceLower,
      priceUpper: priceUpper,
      status: "a",
      categoryName: fullCategoryName,
      user: user,
      // hashtags: hashtags,
      preferredItemCondition: preferredItemCondition,
      isPreferredDeliveryMeet: isPreferredDeliveryMeet,
      isPreferredDeliveryDeliver: isPreferredDeliveryDeliver,
      isPreferredPaymentCash: isPreferredPaymentCash,
      isPreferredPaymentPayNow: isPreferredPaymentPayNow,
      preferredMeetUpLocation: preferredMeetUpLocation,
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

      const formData = new FormData();
      formData.append("file", file);
      Promise.all([
        WTBService.postListingImage(res.data.wtbId, formData),
        BuyerQnAService.postManyBuyerQnAs(buyerQnAs),
      ]).then((res) => {
        history.push({
          pathname: "/my-listings",
        });
      });
    });
  };

  const renderQnAFields = () => {
    return qnaList.map((item, index) => {
      return (
        <InputGroup key={index} className="mt-3">
          <InputGroup.Prepend>
            <InputGroup.Text className="ml-4">Question:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            required
            placeholder="Write a question..."
            autoComplete="off"
            type="text"
            name="question"
            value={item.question}
            onChange={(event) => handleQnAChange(event, index)}
          />
          <Button className="btn btn-danger"onClick={(event) => handleRemoveQnA(index)}>Remove</Button>
        </InputGroup>
      );
    });
  };

  if (categoryName === "Computers & Tech") {
    subCategoryOptions = ctSubcategoryDropdownOptions;
  } else if (categoryName === "Furniture & Home Living") {
    subCategoryOptions = fhSubcategoryDropdownOptions;
  } else if (categoryName === "Mobile Phones & Gadgets") {
    subCategoryOptions = mgSubcategoryDropdownOptions;
  }

  const handleSetCategoryName = (value) => {
    var temp = "";
    for (var i = 0; i < value.length; i++) {
      temp += "|";
      temp += value[i].value;
    }
    console.log(temp);
    var fullName = categoryName;
    fullName += temp;
    console.log(fullName);
    setFullCategoryName(fullName);
  };

  return (
    <div>
      <div>
        <br />
        <Dropzone setFile={(file) => setFile(file)} />
        <br />
      </div>
      <Row className="justify-content-md-center">
        <Col lg={12}>
        <h5 className="ml-4 mb-3 mt-4">Item Details</h5>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="ml-4">Title:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      className="mr-4"
                      placeholder="Enter a title..."
                      autoComplete="off"
                      type="text"
                      name="title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col>
              <Form.Group>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="ml-4">Description:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      placeholder="Enter a description of the item..."
                      className="mr-4"
                      autoComplete="off"
                      type="text"
                      name="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          {/* <Form>
            <Row>
              <Col>
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="ml-4">Hashtags:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      className="mr-4"
                      placeholder="Enter some hashtags..."
                      autoComplete="off"
                      type="text"
                      name="hashtags"
                      value={hashtags}
                      onChange={(event) => setHashtags(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </Form> */}
          <Form.Row>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="ml-4">Price Lower:</InputGroup.Text>
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
                  <InputGroup.Text className="ml-4">Price Upper:</InputGroup.Text>
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
          <h5 className="ml-4 mt-2">Category</h5>
          <div style={{ width: 600 }}>
            <Select 
              className="ml-4 mt-3"
              options={categoryDropdownOptions}
              onChange={(value) => {
                setCategoryName(value.value);
              }}
            />
          </div>
          <h5 className="ml-4 mt-2">Subcategories</h5>
          <div style={{ width: 600 }}>
            <Select
              className="ml-4 mt-3"
              closeMenuOnSelect={false}
              options={subCategoryOptions}
              isMulti
              onChange={(value) => {
                handleSetCategoryName(value);
              }}
            />
          </div>
          <div>
            <h5 className="ml-4 mt-3">Preferred Item Condition</h5>
            <ButtonGroup className="ml-4 mt-2">
              {preferredItemConditionRadios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={"radio-${idx}"}
                  type="radio"
                  variant={"outline-primary"}
                  name="radio"
                  value={radio.value}
                  checked={preferredItemCondition === radio.value}
                  onChange={(e) =>
                    setPreferredItemCondition(e.currentTarget.value)
                  }
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <h5 className="ml-4 mt-3">Preferred Delivery Method</h5>
            <Form.Group className="mb-3 ml-4 mt-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Meet-up"
                onChange={(event) => handleMeetChange()}
              />
            </Form.Group>
            {isPreferredDeliveryMeet ? 
             <MeetUpLocationField preferredMeetUpLocation={preferredMeetUpLocation} setPreferredMeetUpLocation={setPreferredMeetUpLocation}/>
             : ''
            }
            <Form.Group className="mb-3 ml-4" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Delivery"
                onChange={(event) => handleDeliverChange()}
              />
            </Form.Group>
          </div>
          <div>
            <h5 className="ml-4 mt-3">Preferred Payment Method</h5>
            <Form.Group className="mb-3 ml-4 mt-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Cash on Meet-up"
                onChange={(event) => handleCashChange()}
              />
            </Form.Group>
            <Form.Group className="mb-3 ml-4" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="PayNow"
                onChange={(event) => handlePayNowChange()}
              />
            </Form.Group>
          </div>
          <Form.Row>
            <Form.Group>
              <h5 className="ml-4 mt-1">Questions for Sellers</h5>
              {renderQnAFields()}
              <Button className="ml-4 mt-3" onClick={handleAddQnA}>Add Question</Button>
            </Form.Group>
          </Form.Row>
          <Button className="ml-4 mt-3 mb-4 mr-4 btn-success btn-lg" onClick={createListing}>Submit</Button>
        </Col>
      </Row>
    </div>
  );
}
