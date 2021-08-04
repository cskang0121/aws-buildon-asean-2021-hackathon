import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";

import { FaAngleRight } from "react-icons/fa";

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
import { ctSubcategoryDropdownOptions } from "../util/ctSubcategories";
import { fhSubcategoryDropdownOptions } from "../util/fhSubcategories";
import { mgSubcategoryDropdownOptions } from "../util/mgSubcategories";

// import {base64StringtoFile,
//   downloadBase64File,
//   extractImageFileExtensionFromBase64,
//   image64toCanvasRef} from "../util/reusableUtils";

import { reactSelectTheme } from "../util/customThemes";

let tempArr = [];
let subCategoryOptions = tempArr.map((options) => {
  return { value: options, label: options };
});

// const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
// const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

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
            <div className="square">
              <img src={imgSrc} />
            </div>
          ) : (
            <div
              className="d-flex ml-3 border border-success rounded w-75 align-items-center justify-content-center"
              style={{ height: 200 }}
            >
              <p className="text-center">Drop your image here</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {imgSrc != null ? (
            <div className="square">
              <img src={imgSrc} />
            </div>
          ) : (
            <div
              className="d-flex border border-primary ml-3 rounded w-75 align-items-center justify-content-center"
              style={{ height: 200 }}
            >
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
              <InputGroup.Text>Meet Location:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              required
              autoComplete="off"
              type="text"
              name="meetUpLocation"
              value={props.meetUpLocation}
              onChange={(event) => props.setMeetUpLocation(event.target.value)}
            />
          </InputGroup>
        </Form.Group>
      </Form.Row>
    </div>
  );
};

export default function CreateIFS(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [fullCategoryName, setFullCategoryName] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [isDeliveryMeet, setIsDeliveryMeet] = useState(false);
  const [isDeliveryDeliver, setIsDeliveryDeliver] = useState(false);
  const [isPaymentCash, setIsPaymentCash] = useState(false);
  const [isPaymentPayNow, setIsPaymentPayNow] = useState(false);
  const [file, setFile] = useState({});
  const [meetUpLocation, setMeetUpLocation] = useState("");

  const history = useHistory();

  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  //for itemCondition
  const itemConditionRadios = [
    { name: " Brand New", value: "Brand New" },
    { name: " Like New", value: "Like New" },
    { name: " Well Used", value: "Well Used" },
    { name: " Heavily Used", value: "Heavily Used" },
  ];

  const handleMeetChange = () => {
    setIsDeliveryMeet(!isDeliveryMeet);
    if (isDeliveryMeet === true) {
      setMeetUpLocation("");
    }
  };

  const handleDeliverChange = () => {
    setIsDeliveryDeliver(!isDeliveryDeliver);
  };

  const handleCashChange = () => {
    setIsPaymentCash(!isPaymentCash);
  };

  const handlePayNowChange = () => {
    setIsPaymentPayNow(!isPaymentPayNow);
  };

  const createListing = (e) => {
    e.preventDefault();
    let listing = {
      title: title,
      description: description,
      picUri: null,
      price: price,
      status: "a",
      listingType: props.listingType,
      categoryName: fullCategoryName,
      user: user,
      itemCondition: itemCondition,
      isDeliveryMeet: isDeliveryMeet,
      isDeliveryDeliver: isDeliveryDeliver,
      isPaymentCash: isPaymentCash,
      isPaymentPayNow: isPaymentPayNow,
      meetUpLocation: meetUpLocation,
    };

    IFSService.postIFSListing(listing).then((res) => {
      const formData = new FormData();
      formData.append("file", file);
      let returnIFSId = new Promise((resolve, reject) => {
        return resolve(res.data);
      });
      Promise.all([
        IFSService.postListingImage(res.data.ifsId, formData),
        returnIFSId,
      ]).then((res) => {
        if (props.listingType === "s") {
          history.push({
            pathname: "/my-listings",
          });
        } else {
          props.setDeal(res[1], e);
        }
      });
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
    console.log(value);
    setCategoryName(value);
    setFullCategoryName(value);
  };

  const handleSetFullCategoryName = (value) => {
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
      <Row className="justify-content-md-center">
        <Col className="shadow-sm" lg={4}>
          <Dropzone setFile={(file) => setFile(file)} />
        </Col>
        <Col lg={8} className="shadow py-3 px-5">
          <h5 className="mb-3">Item Details</h5>
          <Form>
            <Form.Row>
              <Col>
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Prepend className="create-listing-input">
                      <InputGroup.Text>Title:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
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
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Prepend className="create-listing-input">
                      <InputGroup.Text>Description:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      placeholder="Enter a description of the item..."
                      autoComplete="off"
                      as="textarea"
                      type="text"
                      name="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col lg={5}>
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
              </Col>
            </Form.Row>
            <Form.Row>
              <Col lg={6}>
                <h5 className="mt-2">Category</h5>
                <div>
                  <Select
                    className="mt-3"
                    options={categoryDropdownOptions}
                    theme={reactSelectTheme}
                    onChange={(value) => {
                      handleSetCategoryName(value.value);
                    }}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <h5 className="mt-2">Subcategories</h5>
                <div>
                  <Select
                    className="mt-3"
                    closeMenuOnSelect={false}
                    options={subCategoryOptions}
                    theme={reactSelectTheme}
                    isMulti
                    onChange={(value) => {
                      handleSetFullCategoryName(value);
                    }}
                  />
                </div>
              </Col>
            </Form.Row>
            <Form.Row>
              <h5 className="mt-3">Item Condition</h5>
            </Form.Row>
            <Form.Row>
              <ButtonGroup style={{ zIndex: 0 }} className="mt-2">
                {itemConditionRadios.map((radio, idx) => (
                  <ToggleButton
                    className="toggleable"
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-primary"
                    name="radio"
                    value={radio.value}
                    checked={itemCondition === radio.value}
                    onChange={(e) => setItemCondition(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Row>
            <Form.Row>
              <h5 className="mt-3">Delivery Method</h5>
            </Form.Row>
            <Form.Row>
              <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Meet-up"
                  onChange={(event) => handleMeetChange()}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              {isDeliveryMeet ? (
                <MeetUpLocationField
                  meetUpLocation={meetUpLocation}
                  setMeetUpLocation={setMeetUpLocation}
                />
              ) : (
                ""
              )}
            </Form.Row>

            <Form.Row>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Delivery"
                  onChange={(event) => handleDeliverChange()}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <h5 className="mt-3">Payment Method</h5>
            </Form.Row>
            <Form.Row>
              <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Cash on Meet-up"
                  onChange={(event) => handleCashChange()}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="PayNow"
                  onChange={(event) => handlePayNowChange()}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="flex-row-reverse">
              <Button className="mt-3 btn-lg" onClick={createListing}>
                List your item <FaAngleRight />
              </Button>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
