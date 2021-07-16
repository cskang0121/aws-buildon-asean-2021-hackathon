import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import UserService from "../../services/UserService";
import PostSellerQnA from "../PostSellerQnA";
import SellerQnAService from "../../services/SellerQnAService";
import NavigationBar from "../Navbar/NavigationBar";

const SellerQnAList = (props) => {
  const [sellerQnAs, setSellerQnAs] = useState([]);

  const fetchSellerQnAs = () => {
    SellerQnAService.getQnAsForIfsListing(props.ifsListing.ifsId).then(
      (res) => {
        setSellerQnAs(res.data);
      }
    );
  };

  useEffect(() => {
    if (props.rerender) {
      fetchSellerQnAs();
      console.log("re-rendered");
      props.setrerender(false);
    }
  }, [props.rerender]);

  return sellerQnAs.map((item, index) => {
    return (
      <div key={index}>
        <h3>
          {index + 1}. {item.question}
        </h3>
        <p>Answer: {item.answer}</p>
      </div>
    );
  });
};

export default function ViewSellerQnA() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [reRender, setReRender] = useState(true);

  

  return (
    <div>
      <NavigationBar />
      <SellerQnAList
        rerender={reRender}
        setrerender={(state) => setReRender(state)}
        ifsListing={location.state.listing}
      />
      <PostSellerQnA
        setrerender={(state) => setReRender(state)}
        show={show}
        onHide={() => setShow(false)}
        ifsListing={location.state.listing}
      />
      <Button onClick={() => setShow(true)}>Ask a Question</Button>
    </div>
  );
}
