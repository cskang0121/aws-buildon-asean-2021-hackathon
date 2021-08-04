import React, { useState, useEffect } from "react";
import { Modal, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import SellerQnAService from "../services/SellerQnAService";
import UserService from "../services/UserService";

export default function PostSellerQnA(props) {
  const [question, setQuestion] = useState({});

  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  useEffect(() => {
    setQuestion({
      ifsListing: props.ifsListing,
      answer: "",
      question: "",
      answerer: props.ifsListing.user,
      asker: user,
    });
  }, [props.ifsListing, user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newQuestion = { ...question };
    newQuestion[name] = value;
    setQuestion(newQuestion);
  };

  const createQuestion = (e) => {
    e.preventDefault();
    SellerQnAService.postSellerQnA(question).then((res) => {
      setQuestion({
        ifsListing: props.ifsListing,
        answer: "",
        question: "",
        answerer: props.ifsListing.user,
        asker: user,
      });
      props.setrerender(true);
      props.onHide();
    });
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title className="pt-2 pb-2 pl-4" id="contained-modal-title-vcenter">
          Ask a Question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="pl-5 pt-4 pb-2 pr-5">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Question:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              required
              placeholder="Enter your question here..."
              autoComplete="off"
              type="text"
              name="question"
              value={question.question}
              onChange={(event) => handleChange(event)}
            />
          </InputGroup>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={createQuestion}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
