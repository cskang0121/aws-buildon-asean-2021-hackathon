import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from "../services/AuthenticationService";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.token) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
