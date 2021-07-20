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

  useEffect(() => {
    fetchListings();
  }, []);

  return listings.map((listing, index) => {
    // Make something less ugly lmao
    return (
      <div>
        <h2 className="m-4">{listing.title}</h2>
        <p>{listing.description}</p>
        <p>Price: {listing.price}</p>
        <p>
          <Button onClick={(event) => setIfsListing(listing)}>
            Select Listing
          </Button>
        </p>
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
            <h1>Use existing listing</h1>
            <UseExistingListing user={user} setIfsListing={setIfsListing} />
            <Button onClick={createDeal}> Submit </Button>
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
