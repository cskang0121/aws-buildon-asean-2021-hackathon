import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Tab,
  Nav,
} from "react-bootstrap";

import { useHistory, useLocation } from "react-router";
import NavigationBar from "../Navbar/NavigationBar";

import DealService from "../../services/DealService";
import UserService from "../../services/UserService";
import IFSService from "../../services/IFSService";
import CreateIFS from "../CreateIFS";
import BuyerQnAService from "../../services/BuyerQnAService";

function ExistingIFS({ listing, index, setIfsListing }) {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    getImage(listing);
  }, [listing]);

  const getImage = (listing) => {
    IFSService.getListingImage(listing.ifsId).then((res) => {
      const byteCode = res.data;
      const firstChar = byteCode.charAt(0);
      var dataType = "";
      if (firstChar === "/") {
        dataType = "jpg";
      } else if (firstChar === "i") {
        dataType = "png";
      } else {
        dataType = "gif";
      }
      setImgSrc("data:image/" + dataType + ";base64," + byteCode);
    });
  };

  return (
    <div key={index} className="col-3">
      <div className="card shadow m-1">
        {listing.picUri && imgSrc ? (
          <img
            className="card-img-top"
            style={{ height: "18vw", objectFit: "cover" }}
            src={imgSrc}
          />
        ) : (
          <p className="text-center">No image found</p>
        )}
        <div className="card-body text-center">
          <h5 className="card-title">{listing.title}</h5>
          <p>
            <b>Price:</b> S$ {listing.price}
          </p>
          <p>
            <Button onClick={(event) => setIfsListing(listing)}>
              Select Listing
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

function UseExistingListing({ user, setIfsListing, useExistingListing }) {
  const [listings, setListings] = useState([]);

  const fetchListings = () => {
    console.log(user);
    IFSService.getCurrentUserIFSListings(user.uid).then((res) => {
      console.log(res.data);
      setListings(res.data);
    });
  };

  const styles = {
    text: {
      fontFamily: "Inter, sans-serif",
    },
  };

  useEffect(() => {
    if (useExistingListing) {
      fetchListings();
      console.log("fetching");
    }
  }, [useExistingListing]);

  return listings.map((listing, index) => {
    return (
      /*Old Code*/
      // <div>
      //   <h2 className="m-4">{listing.title}</h2>
      //   <p className="ml-4">{listing.description}</p>
      //   <p className="ml-4">Price: {listing.price}</p>
      //   <p>
      //     <Button className="ml-4" onClick={(event) => setIfsListing(listing)}>
      //       Select Listing
      //     </Button>
      //   </p>
      // </div>

      /*New Code: CHANGE IMG SRC PLS*/

      <ExistingIFS
        listing={listing}
        index={index}
        setIfsListing={setIfsListing}
      />
    );
  });
}

export default function ProposeDeal(props) {
  const history = useHistory();
  const location = useLocation();

  const [useExistingListing, setUseExistingListing] = useState(null);
  const [ifsListing, setIfsListing] = useState({});
  const [buyerQnAs, setBuyerQnAs] = useState([]);
  const [answersList, setAnswersList] = useState([]);

  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
    setUseExistingListing(true);
    setUser(UserService.getProfile());
    fetchBuyerQnAs();
    // console.log(location.state.listing);
  }, []);

  // ------------------------------------
  // QnA Things
  // ------------------------------------
  const fetchBuyerQnAs = () => {
    BuyerQnAService.getQnAsForWtbListing(location.state.listing.wtbId).then(
      (res) => {
        setBuyerQnAs(res.data);
        let arr = new Array(res.data.length);
        res.data.map((qn, index) => {
          const { qnaId, wtbListing, question } = qn;
          const answerQnA = {
            deal: {},
            answerId: qnaId,
            answer: "",
          };
          arr[index] = answerQnA;
        });
        setAnswersList([...arr]);
        //console.log(answersList);
      }
    );
  };

  const handleAnswerChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...answersList];
    list[index][name] = value;
    setAnswersList(list);
  };

  const renderBuyerQnAs = () => {
    return answersList.map((item, index) => {
      return (
        <div key={index}>
          <b className="ml-4">
            {item.answerId}. {buyerQnAs[index].question}
          </b>
          <Form.Row className="my-2 ml-4">
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Answer:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  placeholder="Write your answers here..."
                  autoComplete="off"
                  type="text"
                  name="answer"
                  value={item.answer}
                  onChange={(event) => handleAnswerChange(event, index)}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </div>
      );
    });
  };

  const checkIfAllAnswered = () => {
    for (let i = 0; i < answersList.length; i++) {
      if (answersList[i].answer === "" || answersList[i].answer.length === 0) {
        return false;
      }
    }
    return true;
  };

  // ------------------------------------
  // Post the deal
  // ------------------------------------

  // Create using existing listing
  const createDeal = (e) => {
    e.preventDefault();
    if (!checkIfAllAnswered()) {
      alert("Please answer all questions");
      return;
    }
    let deal = {
      seller: user,
      wtbId: location.state.listing,
      ifsId: ifsListing,
      dateOfDeal: null,
      status: "p",
    };

    console.log(deal);

    DealService.postDeal(deal).then((res) => {
      const answers = [...answersList];
      answers.map((a, index, arr) => {
        arr[index] = {
          deal: res.data,
          answerId: a.answerId,
          answer: a.answer,
        };
      });
      BuyerQnAService.postManyAnswerQnAs(answers).then((res) => {
        history.push({
          pathname: "/transaction-active",
        });
      });
    });
  };

  // Create a new listing
  const createDealListing = (listing, e) => {
    if (!checkIfAllAnswered()) {
      alert("Please answer all questions");
      return;
    }

    let deal = {
      seller: user,
      wtbId: location.state.listing,
      ifsId: listing,
      dateOfDeal: null,
      status: "p",
    };

    console.log(deal);

    DealService.postDeal(deal).then((res) => {
      const answers = [...answersList];
      answers.map((a, index, arr) => {
        arr[index] = {
          deal: res.data,
          answerId: a.answerId,
          answer: a.answer,
        };
      });
      BuyerQnAService.postManyAnswerQnAs(answers).then((res) => {
        history.push({
          pathname: "/transaction-active",
        });
      });
    });
  };

  // Use Existing Listing or Create New One
  // const showFormOrList = () => {
  //   switch (useExistingListing) {
  //     case "Y":
  //       return (
  //         <div className="d-flex flex-column justify-content-space-around">
  //           <div className="text-center ml-5 mr-5">
  //             <Button
  //               className="m-4"
  //               onClick={(event) => setUseExistingListing("N")}
  //             >
  //               Create New Listing
  //             </Button>
  //           </div>
  //           <hr></hr>
  //           <h1 className="m-4">Use Existing Listing</h1>
  //           <div className="row m-4">
  //             <UseExistingListing user={user} setIfsListing={setIfsListing} />
  //           </div>
  //           <div className="text-center m-4 ">
  //             <Button className="btn btn-block" onClick={createDeal}>
  //               {" "}
  //               Submit{" "}
  //             </Button>
  //           </div>
  //         </div>
  //       );
  //     case "N":
  //       return (
  //         <div>
  //           <div className="text-center ml-5 mr-5">
  //             <Button
  //               className="m-4"
  //               onClick={(event) => setUseExistingListing("Y")}
  //             >
  //               Use Existing Listing
  //             </Button>
  //           </div>
  //           <hr></hr>
  //           <div>
  //             <h1 className="m-4">Create New Listing</h1>
  //             <CreateIFS
  //               listingType="d"
  //               setDeal={(listing, event) => createDealListing(listing, event)}
  //             />
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div className="d-flex justify-content-center align-items-center ml-5 mr-5">
  //           <Button
  //             className="m-4"
  //             onClick={(event) => setUseExistingListing("Y")}
  //           >
  //             Use Existing Listing
  //           </Button>
  //           <Button
  //             className="m-4"
  //             onClick={(event) => setUseExistingListing("N")}
  //           >
  //             Create New Listing
  //           </Button>
  //         </div>
  //       );
  //   }
  // };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h2 className="m-4">You are proposing a deal for:</h2>
            <h4 className="mx-4">{location.state.listing.title}</h4>
            <hr />
            <div className="mx-4">
              <b>Requested by: </b> {location.state.listing.user.username}
            </div>
            <div className="mx-4 my-2">
              <b>Price Range: </b> S$ {location.state.listing.priceLower} -{" "}
              {location.state.listing.priceUpper}
            </div>
            <p className="m-4">{location.state.listing.description}</p>
            <hr />
            {renderBuyerQnAs()}
          </div>
          <div className="col-lg-8 shadow-sm">
            <Tab.Container defaultActiveKey="existingListing">
              <Nav fill variant="underline" className="my-4">
                <Nav.Item>
                  <Nav.Link
                    eventKey="existingListing"
                    onSelect={(event) => setUseExistingListing(true)}
                  >
                    Use Existing Listing
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="createListing"
                    onSelect={(event) => setUseExistingListing(false)}
                  >
                    Create New Listing
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="existingListing">
                  <div>
                    <div className="row">
                      <UseExistingListing
                        user={user}
                        setIfsListing={setIfsListing}
                        useExistingListing={useExistingListing}
                      />
                    </div>
                    <div className="row my-4">
                      <Button className="btn btn-block" onClick={createDeal}>
                        {" "}
                        Submit{" "}
                      </Button>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="createListing">
                  <CreateIFS
                    listingType="d"
                    setDeal={(listing, event) =>
                      createDealListing(listing, event)
                    }
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </div>
  );
}
