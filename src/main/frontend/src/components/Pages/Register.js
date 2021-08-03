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

import NavigationBar from "../Navbar/NavigationBar";

import AuthenticationService from "../../services/AuthenticationService";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");

  const history = useHistory();

  const createUser = (e) => {
    e.preventDefault();
    let user = {
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      location: location,
    };

    AuthenticationService.registerUser(user).then((res) => {
      history.push({
        pathname: "/login",
      });
    });
  };

  return (
    <div>
      <NavigationBar />
      <h3 className="m-5 mb-2" style={{fontSize: "22px", textAlign: "center"}}>Register a new account!</h3>
      <Row className="justify-content-md-center">
        <Col lg={12}>
          <div class="form-row m-5 mb-4">
                  <div class="input-group input-group-lg col-md-6 mx-auto">
                      <div class="input-group-prepend register-page">
                          <span class="input-group-text">Username</span>
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

              <div class="form-row ml-5 mr-5 mb-4">
                  <div class="input-group input-group-lg col-md-6 mx-auto">
                      <div class="input-group-prepend register-page">
                          <span class="input-group-text col-md-13">Email</span>
                      </div>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                </div>
              </div>

              <div class="form-row ml-5 mr-5 mb-4">
                  <div class="input-group input-group-lg col-md-6 mx-auto">
                      <div class="input-group-prepend register-page">
                          <span class="input-group-text col-md-13">Password</span>
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

              <div class="form-row ml-5 mr-5 mb-4">
                  <div class="input-group input-group-lg col-md-6 mx-auto">
                      <div class="input-group-prepend register-page">
                          <span class="input-group-text col-md-13">First Name</span>
                      </div>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                </div>
              </div>

              <div class="form-row ml-5 mr-5 mb-4">
                  <div class="input-group input-group-lg col-md-6 mx-auto">
                      <div class="input-group-prepend register-page">
                          <span class="input-group-text col-md-13">Last Name</span>
                      </div>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                </div>
              </div>

              <div class="form-row ml-5 mr-5 mb-5">
                  <div class="input-group input-group-lg col-md-6 mx-auto">
                      <div class="input-group-prepend register-page">
                          <span class="input-group-text col-md-13">Location</span>
                      </div>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                      />
                </div>
              </div>

              <Button className="mb-5 btn" style={{display: "block", margin: "0 auto"}}onClick={createUser}> Submit </Button>

              <Card className="text-center">
              <Card.Footer className="text-muted">A new C2C experience</Card.Footer>
              </Card>
        </Col>
      </Row>
    </div>
  );
}
