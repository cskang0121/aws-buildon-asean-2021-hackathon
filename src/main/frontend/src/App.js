import React, { useState, useEffect } from "react";
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
import WTBListingDetails from "./components/Pages/WTBListingDetails";
import IFSListingDetails from "./components/Pages/IFSListingDetails";
import Deal from "./components/Pages/Deal";
import Offer from "./components/Pages/Offer";

import AuthenticationService from "./services/AuthenticationService";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = AuthenticationService.getCurrentUserToken();

    if (user && user.token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return loggedIn ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <PrivateRoute path="/home" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/wtb" exact component={WTB} />
          <PrivateRoute path="/add-wtb" exact component={CreateWTB} />
          <PrivateRoute path="/ifs" exact component={IFS} />
          <PrivateRoute path="/add-ifs" exact component={CreateIFS} />
          <PrivateRoute path="/search" exact component={Search} />
          <PrivateRoute path="/wtb-listing-details" exact component={WTBListingDetails} />
          <PrivateRoute path="/ifs-listing-details" exact component={IFSListingDetails} />
          <PrivateRoute path="/deal" exact component={Deal} />
          <PrivateRoute path="/offer" exact component={Offer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
