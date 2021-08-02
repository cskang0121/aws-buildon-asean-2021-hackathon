import React, { useState, useEffect } from "react";
import "./App.css";
import "./custom.scss";
//import "bootstrap/dist/css/bootstrap.min.css";

import NavigationBar from "./components/Navbar/NavigationBar";
import Home from "./components/Pages/Home";
import Register from "./components/Pages/Register";
import ViewMyListings from "./components/Pages/ViewMyListings";
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
import ViewSellerQnA from "./components/Pages/ViewSellerQnA";
import AnswerSellerQnA from "./components/Pages/AnswerSellerQnA";
import ViewTransactionHistory from "./components/Pages/ViewTransactionHistory";
import ViewActiveTransactions from "./components/Pages/ViewActiveTransactions";
import ViewAllReceivedDeals from "./components/Pages/ViewAllReceivedDeals";

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
          <PrivateRoute path="/my-listings" exact component={ViewMyListings} />
          <PrivateRoute path="/post-listing" exact component={CreateListing} />
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
            path="/received-deals"
            exact
            component={ViewAllReceivedDeals}
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
          <PrivateRoute
            path="/view-seller-qna"
            exact
            component={ViewSellerQnA}
          />
          <PrivateRoute
            path="/answer-seller-qna"
            exact
            component={AnswerSellerQnA}
          />
          <PrivateRoute
            path="/transaction-history"
            exact
            component={ViewTransactionHistory}
          />
          <PrivateRoute
            path="/transaction-active"
            exact
            component={ViewActiveTransactions}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
