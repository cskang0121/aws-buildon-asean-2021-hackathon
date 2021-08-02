import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Card,
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
      <Card className="text-center">
        <Card.Header><h4>Welcome!</h4></Card.Header>
        <Card.Body>
          <Card.Title className="mt-4">Enter your login details</Card.Title>
            <Card.Text>
              <div class="form-row m-4">
                  <div class="input-group input-group-lg col-md-3 mx-auto">
                      <div class="input-group-prepend">
                          <span class="input-group-text">Username:</span>
                      </div>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                      />
                </div>
              </div>
              <div class="form-row ml-4 mr-4 mb-5">
                  <div class="input-group input-group-lg col-md-3 mx-auto">
                      <div class="input-group-prepend">
                          <span class="input-group-text">Password:</span>
                      </div>
                      <FormControl
                        required
                        autoComplete="off"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                </div>
              </div>
          <Button className="mb-4" onClick={login}> Submit </Button>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">A new C2C experience</Card.Footer>
      </Card>
    </div>
  );
}
