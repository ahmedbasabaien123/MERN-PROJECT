import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Home from "../../pages/Home";
import { Redirect } from "react-router-dom";
import NavBar from "../NavBar";
import LeftNav from "../LeftNav";

function Routes() {
  return (
    <Router>
      <LeftNav /> 
      <NavBar />
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
