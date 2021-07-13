import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import AuthenticationService from "../../services/AuthenticationService";
import UserService from "../../services/UserService";
import NavigationBar from "../Navbar/NavigationBar";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    let user = {
      username: username,
      password: password,
    };

    AuthenticationService.authenticate(user)
      .then((res) => UserService.setProfileIntoLocalStorage())
      .then((res) => {
        //console.log(value);
        history.push({
          pathname: "/home",
        });
      });
  };

  return (
    <div>
      <NavigationBar />
      <Row className="justify-content-md-center">
        <Col lg={12}>
          <Form.Row>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Username:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  autoComplete="off"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Password:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  required
                  autoComplete="off"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Button onClick={login}> Submit </Button>
        </Col>
      </Row>
    </div>
  );
}
