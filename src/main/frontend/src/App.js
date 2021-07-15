import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavigationBar from "./components/Navbar/NavigationBar";
import Home from "./components/Pages/Home";
import Register from "./components/Pages/Register";
import WTB from "./components/Pages/WTB";
import IFS from "./components/Pages/IFS";
import CreateListing from "./components/Pages/CreateListing";
import Login from "./components/Pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import Search from "./components/Pages/Search";
import WTBListingDetails from "./components/Pages/WTBListingDetails";
import IFSListingDetails from "./components/Pages/IFSListingDetails";
import Deal from "./components/Pages/ProposeDeal";
import Offer from "./components/Pages/MakeOffer";
import ViewAllReceivedOffers from "./components/Pages/ViewAllReceivedOffers";
import ViewListingOffers from "./components/Pages/ViewListingOffers";
import ViewListingDeals from "./components/Pages/ViewListingDeals";

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
          <PrivateRoute path="/post-listing" exact component={CreateListing} />
          <PrivateRoute path="/ifs" exact component={IFS} />
          <PrivateRoute path="/search" exact component={Search} />
          <PrivateRoute
            path="/wtb-listing-details"
            exact
            component={WTBListingDetails}
          />
          <PrivateRoute
            path="/ifs-listing-details"
            exact
            component={IFSListingDetails}
          />
          <PrivateRoute path="/deal" exact component={Deal} />
          <PrivateRoute path="/offer" exact component={Offer} />
          <PrivateRoute
            path="/received-offers"
            exact
            component={ViewAllReceivedOffers}
          />
          <PrivateRoute
            path="/view-listing-offers"
            exact
            component={ViewListingOffers}
          />
          <PrivateRoute
            path="/view-listing-deals"
            exact
            component={ViewListingDeals}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
