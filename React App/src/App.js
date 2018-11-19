import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { Game } from './components/Game';
import { RegisterPage } from './components/RegisterPage';
import "./App.css"

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <div>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/Game' component={Game} />
        <Route path='/RegisterPage' component={RegisterPage} />
      </Layout>
      <footer>Phurman and The Boiz @2018</footer>
      </div>
    );
  }
}
