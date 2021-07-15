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
        <h2>{listing.title}</h2>
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

  // QnA things
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
          <h3>
            {item.answerId}. {buyerQnAs[index].question}
          </h3>
          <Form.Row>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Answer:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
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

  // ------------------------------------
  // Post the deal
  // ------------------------------------

  // Create using existing listing
  const createDeal = (e) => {
    e.preventDefault();
    let deal = {
      seller: user,
      wtbId: location.state.listing,
      ifsId: ifsListing,
      dateOfDeal: null,
      status: "p",
    };

    console.log(deal);

    DealService.postDeal(deal).then((res) => {
      history.push({
        pathname: "/home",
      });
    });
  };

  // Create a new listing
  const createDealListing = (listing) => {
    let deal = {
      seller: user,
      wtbId: location.state.listing,
      ifsId: listing,
      dateOfDeal: null,
      status: "p",
    };

    console.log(deal);

    DealService.postDeal(deal).then((res) => {
      history.push({
        pathname: "/home",
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
        return (
          <div>
            <h1>Create new listing</h1>
            <CreateIFS listingType="d" setDeal={createDealListing} />
          </div>
        );
      default:
        return (
          <div>
            <Button onClick={(event) => setUseExistingListing("Y")}>
              Use Existing Listing
            </Button>
            <Button onClick={(event) => setUseExistingListing("N")}>
              Create New Listing
            </Button>
          </div>
        );
    }
  };

  return (
    <div>
      <NavigationBar />
      <h1>Propose Deal for:</h1>
      <h2>{location.state.listing.title}</h2>
      {renderBuyerQnAs()}
      {showFormOrList()}
    </div>
  );
}
