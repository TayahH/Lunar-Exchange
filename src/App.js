// Modules
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Styles
import "./App.css";

// Components
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

// Pages
import Home from "./pages/Home";
import Stocks from "./pages/Stocks";
import Quotes from "./pages/Quotes";
import Login from "./pages/Login";
import Register from "./pages/Register";


export default function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/Stocks">
          <Stocks />
        </Route>

        <Route path="/Quotes/:symbol">
          <Quotes />
        </Route>

        <Route exact path="/Login">
          <Login />
        </Route>

        <Route exact path="/Register">
          <Register />
        </Route>

      </Switch>
      <Footer />
    </Router>
  );
}
