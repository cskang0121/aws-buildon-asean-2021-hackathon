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

import IFSService from "../services/IFSService";
import UserService from "../services/UserService";

import { categoryDropdownOptions } from "../util/categories";

// import {base64StringtoFile,
//   downloadBase64File,
//   extractImageFileExtensionFromBase64,
//   image64toCanvasRef} from "../util/reusableUtils";

// const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
// const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

function Dropzone(props) {
  const [imgSrc, setImgSrc] = useState(null);

  // const verifyFile = (files) => {
  //   if (files && files.length > 0){
  //       const currentFile = files[0]
  //       const currentFileType = currentFile.type
  //       const currentFileSize = currentFile.size
  //       if(currentFileSize > imageMaxSize) {
  //           alert("This file is not allowed. " + currentFileSize + " bytes is too large")
  //           return false
  //       }
  //       if (!acceptedFileTypesArray.includes(currentFileType)){
  //           alert("This file is not allowed. Only images are allowed.")
  //           return false
  //       }
  //       return true
  //   }
  // }

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      // const isVerified = this.verifyFile(acceptedFiles)
      // if (isVerified){
      // imageBase64Data
      const currentFile = acceptedFiles[0];
      const myFileItemReader = new FileReader();
      myFileItemReader.addEventListener(
        "load",
        () => {
          // console.log(myFileItemReader.result)
          const myResult = myFileItemReader.result;
          setImgSrc(myResult);
        },
        false
      );

      myFileItemReader.readAsDataURL(currentFile);

      // }
    }
    const file = acceptedFiles[0];
    console.log(file);
    props.setFile(file);
    // const formData = new FormData();
    // formData.append("file", file);
  }, []);

  // postListingImage();

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
            <div
              className="d-flex container border border-success rounded w-75 align-items-center justify-content-center"
              style={{ height: 200 }}
            >
              <p className="text-center">Drop your image here</p>
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
            <div
              className="d-flex container border border-success rounded w-75 align-items-center justify-content-center"
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
  // const [hashtags, setHashtags] = useState("");
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
      categoryName: categoryName,
      user: user,
      // hashtags: hashtags,
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

  const handleSetCategoryName = (value) => {
    var temp = "";
    for (var i=0; i < value.length; i++) {
      temp += value[i].value;
      temp += "|"
    }
    setCategoryName(temp);
  }

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
                      <InputGroup.Text className="ml-4">
                        Description:
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      className="mr-4"
                      placeholder="Enter a description of the item..."
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
                      <InputGroup.Text className="ml-4">
                        Hashtags:
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      className="mr-4"
                      placeholder="Enter some hashtags..."
                      autoComplete="off"
                      type="text"
                      name="description"
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
                  <InputGroup.Text className="ml-4">Price:</InputGroup.Text>
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
          <h5 className="ml-4 mt-2">Category</h5>
          <div style={{ width: 600 }}>
            <Select
              className="ml-4 mt-3"
              closeMenuOnSelect={false}
              options={categoryDropdownOptions}
              isMulti
              onChange={(value) => {
                handleSetCategoryName(value);
              }}
            />
          </div>
          <div>
            <h5 className="ml-4 mt-3">Item Condition</h5>
            <ButtonGroup className="ml-4 mt-2">
              {itemConditionRadios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={"radio-${idx}"}
                  type="radio"
                  variant={"outline-primary"}
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
            <h5 className="ml-4 mt-3">Delivery Method</h5>
            <Form.Group
              className="mb-3 ml-4 mt-3"
              controlId="formBasicCheckbox"
            >
              <Form.Check
                type="checkbox"
                label="Meet-up"
                onChange={(event) => handleMeetChange()}
              />
            </Form.Group>
            {isDeliveryMeet ? 
             <MeetUpLocationField meetUpLocation={meetUpLocation} setMeetUpLocation={setMeetUpLocation}/>
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
            <h5 className="ml-4 mt-3">Payment Method</h5>
            <Form.Group
              className="mb-3 ml-4 mt-3"
              controlId="formBasicCheckbox"
            >
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
          <Button
            className="ml-4 mt-3 mb-4 mr-4 btn-success btn-lg"
            onClick={createListing}
          >
            {" "}
            Submit{" "}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
