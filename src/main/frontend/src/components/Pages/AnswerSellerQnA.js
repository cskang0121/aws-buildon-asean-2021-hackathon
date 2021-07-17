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
      <div key={index}>
        <h3>
          {index + 1}. {item.question}
        </h3>
        <Form>
          <Form.Label>
            <p>Answer:</p>
          </Form.Label>
          <FormField
            index={index}
            item={item}
            editAnswer={editAnswer}
            setEditAnswer={setEditAnswer}
          />
          <Button onClick={() => handleShowForm(index)}>Edit Answer</Button>
        </Form>
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
      <SellerQnAList ifsListing={location.state.listing} />
    </div>
  );
}
