import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Layout from "./components/Layout/index";
import Signup from "./pages/SignUp";
import IslandsNearMe from "./pages/IslandList";
import FeatureRequests from "./pages/FeatureRequests";
import Session from "./pages/MySession";
import { getUser } from "./helpers/local-storage";

const PrivateRoute = props => {
  const user = getUser();
  return user ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: props.location }
      }}
    />
  );
};

const Routes = () => {
  const user = getUser();
  const PublicLoggedOutRoute = props => {
    return !user ? (
      <Route {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/",
          state: { from: props.location }
        }}
      />
    );
  };

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/islandsnearme" component={IslandsNearMe} />
          <Route exact path="/requests" component={FeatureRequests} />
          <Route exact path="/about" component={About} />
          <PublicLoggedOutRoute exact path="/login" component={Login} />
          <PublicLoggedOutRoute exact path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/current-session/" component={Session} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;
