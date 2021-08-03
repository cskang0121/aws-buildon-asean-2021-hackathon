import React, { useEffect, useState } from "react";
import NavigationBar from "../Navbar/NavigationBar";
import { Form, InputGroup, FormControl, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router";
import UserService from "../../services/UserService";

export function Messages({ messages, thisUser }) {
  return messages.map((message, index) => {
    if (message.sender === thisUser) {
      return (
        <div key={index}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              className="rounded d-flex flex-column py-1 pr-3 pl-5 m-1 text-right"
              style={{
                backgroundColor: "#E0AAFF",
              }}
            >
              <b>{message.sender.username}</b>
              <p>{message.message}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={index}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              className="rounded d-flex flex-column py-1 pl-3 pr-5 m-1"
              style={{
                backgroundColor: "#dee2e6",
              }}
            >
              <b>{message.sender.username}</b>
              <p>{message.message}</p>
            </div>
          </div>
        </div>
      );
    }
  });
}

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const [thisUser, setThisUser] = useState(UserService.getProfile());

  const [otherUser, setOtherUser] = useState(location.state.otherUser);

  useEffect(() => {
    console.log(thisUser);
    console.log(otherUser);
    setMessages([
      { sender: otherUser, receiver: thisUser, message: "Hello" },
      { sender: otherUser, receiver: thisUser, message: "How are you?" },
    ]);
  }, []);

  const [text, setText] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    const message = { sender: thisUser, receiver: otherUser, message: text };
    setMessages([...messages, message]);
    setText("");
  };

  return (
    <div>
      <NavigationBar />
      <div className="container my-4">
        <Card>
          <Card.Header className="d-flex justify-content-center align-items-center">
            <h3>{otherUser.username}</h3>
          </Card.Header>
          <Card.Body>
            <Messages messages={messages} thisUser={thisUser} />
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center align-items-center">
            <Form>
              <Form.Row>
                <Form.Group>
                  <InputGroup>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="textMsg"
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                    />
                    <Button onClick={(event) => sendMessage(event)}>
                      Send
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Form.Row>
            </Form>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
