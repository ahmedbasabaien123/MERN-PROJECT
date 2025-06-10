import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Home from "../../pages/Home";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function Routes() {
  return (
    <Router>
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/profil" exact component={Profil}/>
      <Route path="/trending" exact component={Trending} />
      <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default Routes;
