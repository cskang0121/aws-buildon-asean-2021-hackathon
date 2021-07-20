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

import DealService from "../../services/DealService";
import UserService from "../../services/UserService";
import IFSService from "../../services/IFSService";
import CreateIFS from "../CreateIFS";
import BuyerQnAService from "../../services/BuyerQnAService";

function UseExistingListing({ user, setIfsListing }) {
  const [listings, setListings] = useState([]);
  const [currentListing, setCurrentListing] = useState({});

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
    fetchListings();
  }, []);

  return listings.map((listing, index) => {
    // Make something less ugly lmao

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
      <div className="container-fluid">
        <div className="row ml-4 mr-4">
          <div key={index} className="col-3">
            <div className="card shadow m-1">
            {/* {listing.picUri && imgSrc ? (
                <img className="card-img-top" style={{ height: "18vw", objectFit: "cover" }} src={imgSrc} />
              ) : (
                <p className="text-center">No image found</p>
              )} */}
              <img className="card-img-top" style={{ height: "18vw", objectFit: "cover" }} src={"https://www.news-medical.net/image.axd?picture=2018%2F4%2Fshutterstock_By_spkphotostock.jpg"} />
                  <div className="card-body text-center" style={styles.text}>
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
        </div>
      </div>
    );
  });
}

export default function ProposeDeal(props) {
  const history = useHistory();
  const location = useLocation();

  const [useExistingListing, setUseExistingListing] = useState("");
  const [ifsListing, setIfsListing] = useState({});
  const [buyerQnAs, setBuyerQnAs] = useState([]);
  const [answersList, setAnswersList] = useState([]);

  // Get user
  const [user, setUser] = useState({});
  useEffect(() => {
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
          <h4 className="ml-4">
            {item.answerId}. {buyerQnAs[index].question}
          </h4>
          <Form.Row>
            <Form.Group className="ml-4 container-fluid mr-4">
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
          pathname: "/home",
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
          pathname: "/home",
        });
      });
    });
  };

  // Use Existing Listing or Create New One
  const showFormOrList = () => {
    switch (useExistingListing) {
      case "Y":
        return (
          <div>
            <h1 className="ml-4">Use existing listing:</h1>
            <UseExistingListing user={user} setIfsListing={setIfsListing} />
            <div className="text-center m-4 ">
              <Button className="btn btn-block btn-success" onClick={createDeal}> Submit </Button>
            </div>
          </div>
        );
      case "N":
        return ([
          <hr></hr>,
          <div>
            <h1 className="m-4">Create New Listing</h1>
            <CreateIFS listingType="d" setDeal={(listing, event) => createDealListing(listing, event)} />
          </div>
        ]);
      default:
        return ([
          <div className="position-relative text-center ml-5 mr-5">
            <Button className="mt-4 mb-4" onClick={(event) => setUseExistingListing("Y")}>
              Use Existing Listing
            </Button>
          </div>,
          <div className="text-center ml-5 mr-5">
            <Button onClick={(event) => setUseExistingListing("N")}>
              Create New Listing
            </Button>
          </div>
        ]);
    }
  };

  return (
    <div>
      <NavigationBar />
      <h1 className="m-4">Proposing Deal for:</h1>
      <h2 className="m-4">{location.state.listing.title}</h2>
      {renderBuyerQnAs()}
      {showFormOrList()}
    </div>
  );
}
