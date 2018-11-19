import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { Game } from './components/Game';
import { RegisterPage } from './components/RegisterPage';
<<<<<<< HEAD
import "./App.css"
=======
import { RollDice} from './components/DiceRoll'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {CharacterSheet} from "./components/CharacterSheet"
>>>>>>> 180c973d36903d849b8a69cb3bf16bb5d9ad2a25

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
        <Route path='/RollDice' component={RollDice} />
        <Route path="/CharacterSheet" component={CharacterSheet} />
      </Layout>
      <footer>Phurman and The Boiz @2018</footer>
      </div>
    );
  }
}
