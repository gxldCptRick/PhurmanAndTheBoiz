import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Pages/Home";
import { Game } from "./components/Pages/Game";
import ProfilePage from "./components/Pages/ProfilePage";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./App.css";
import { Account } from "./components/Pages/Account";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <div>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/Game" component={Game} />
          <Route path="/Login" component={Account}/>
          <Route path="/Profile" component={ProfilePage}/>
        </Layout>
        <footer>Phurman and The Boiz @2018</footer>
      </div>
    );
  }
}