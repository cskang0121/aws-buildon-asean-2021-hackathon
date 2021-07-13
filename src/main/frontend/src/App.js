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
import Login from "./components/Pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import Search from "./components/Pages/Search";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/home" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/wtb" exact component={WTB} />
          <PrivateRoute path="/add-wtb" exact component={CreateWTB} />
          <PrivateRoute path="/ifs" exact component={IFS} />
          <PrivateRoute path="/add-ifs" exact component={CreateIFS} />
          <PrivateRoute path="/search" exact component={Search} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
