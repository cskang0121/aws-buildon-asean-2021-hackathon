import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavigationBar from "./components/Navbar/NavigationBar";
import Home from "./components/Pages/Home";
import Register from "./components/Pages/Register";
import WTB from "./components/Pages/WTB";
import CreateWTB from "./components/Pages/CreateWTB";
import IFS from "./components/Pages/IFS";
import CreateIFS from "./components/Pages/CreateIFS";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12}>
            <Router>
              <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/register" exact component={Register} />
                <Route path="/wtb" exact component={WTB} />
                <Route path="/add-wtb" exact component={CreateWTB} />
                <Route path="/ifs" exact component={IFS} />
                <Route path="/add-ifs" exact component={CreateIFS} />
              </Switch>
            </Router>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
