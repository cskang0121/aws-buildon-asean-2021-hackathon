import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");

  return (
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
                <InputGroup.Text>Email:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                required
                autoComplete="off"
                type="text"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
        <Form.Row>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>First Name:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                required
                autoComplete="off"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Last Name:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                required
                autoComplete="off"
                type="text"
                name="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Location:</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                required
                autoComplete="off"
                type="text"
                name="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Button> Submit </Button>
      </Col>
    </Row>
  );
}
