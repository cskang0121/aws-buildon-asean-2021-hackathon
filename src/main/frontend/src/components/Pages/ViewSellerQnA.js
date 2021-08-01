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
      <div class="card mb-4 ml-6 mr-6 pt-3 pb-3 pl-4 pr-5">
        <div class="card-body">
          <div key={index}>
            <h4>
              {index + 1}. {item.question}
            </h4>
            <p class="mt-3">Answer: {item.answer}</p>
          </div>
        </div>
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
      <h2 className="m-4 text-center">Questions & Answers</h2>
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
      <div className="text-center m-4">
        <Button onClick={() => setShow(true)}>Ask a Question</Button>
      </div>
    </div>
  );
}
