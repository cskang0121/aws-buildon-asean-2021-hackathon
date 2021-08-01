import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import UserService from "../../services/UserService";
import SellerQnAService from "../../services/SellerQnAService";
import NavigationBar from "../Navbar/NavigationBar";

const FormField = ({
  index: index,
  item: item,
  editAnswer: parentEditAnswer,
  setEditAnswer: setParentEditAnswer,
}) => {
  const [editAnswer, setEditAnswer] = useState(parentEditAnswer);
  const [ans, setAns] = useState(item);

  useEffect(() => {
    setEditAnswer(parentEditAnswer);
  }, [parentEditAnswer]);

  const handleAnswerChange = (event) => {
    const { name, value } = event.target;
    const newAnswer = { ...ans };
    newAnswer[name] = value;
    setAns(newAnswer);
    //console.log(ans);
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    SellerQnAService.postSellerQnA(ans).then((res) => {
      const hideAnswer = [...editAnswer];
      hideAnswer[index] = false;
      setParentEditAnswer(hideAnswer);
    });
  };

  return (
    <div>
      {editAnswer[index] ? (
        <InputGroup key={index}>
          <FormControl
            required
            autoComplete="off"
            type="text"
            name="answer"
            value={ans.answer}
            onChange={(event) => handleAnswerChange(event)}
          />
          <Button onClick={(event) => handleSubmitAnswer(event)}>Submit</Button>
        </InputGroup>
      ) : (
        <p>{ans.answer}</p>
      )}
    </div>
  );
};

const SellerQnAList = (props) => {
  const [sellerQnAs, setSellerQnAs] = useState([]);
  const [editAnswer, setEditAnswer] = useState([]);

  const fetchSellerQnAs = () => {
    SellerQnAService.getQnAsForIfsListing(props.ifsListing.ifsId).then(
      (res) => {
        setSellerQnAs(res.data);
        let arr = new Array(res.data.length);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = false;
        }
        setEditAnswer(arr);
      }
    );
  };

  useEffect(() => {
    fetchSellerQnAs();
  }, []);

  return sellerQnAs.map((item, index) => {
    const handleShowForm = (index) => {
      let arr = [...editAnswer];
      arr[index] = !arr[index];
      setEditAnswer(arr);
    };

    return (
      <div class="card mb-4 ml-6 mr-6 pt-3 pb-3 pl-4 pr-5">
        <div class="card-body">
          <div key={index}>
            <h4>
              {index + 1}. {item.question}
            </h4>
            <Form>
              <Form.Label>
                <h6 class="mt-3">Answer:</h6>
              </Form.Label>
              <FormField
                index={index}
                item={item}
                editAnswer={editAnswer}
                setEditAnswer={setEditAnswer}
              />
              <Button className="mt-4" onClick={() => handleShowForm(index)}>Edit Answer</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  });
};

export default function AnswerSellerQnA() {
  const location = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  return (
    <div>
      <NavigationBar />
      <h2 className="m-4 text-center">Questions & Answers</h2>,
      <SellerQnAList ifsListing={location.state.listing} />
    </div>
  );
}
