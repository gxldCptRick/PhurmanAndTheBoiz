import React from "react";
import Canvas from "../Gameplay/Canvas";
import { Link } from "react-router-dom";
import { Route } from "react-router";
import { DiceRoll } from '../Gameplay/DiceRoll'
import Chat from '../Gameplay/Chat'
import CharacterSheet from '../models/CharacterSheet'
import CharacterSheets from '../models/CharacterSheet'

export function Game(props) {
  return (
    <div>
      <h2>Game</h2>
      <div className="row">
      <Canvas />
      <div className="toolbar">
          <div>
          <Route exact path="/Game/Dice" component={DiceRoll} />
          <Route exact path="/Game/Chat" component={Chat}/>
          <Route exact path="/Game/Character" component={CharacterSheet}/>
          <Route exact path="/Game/Characters" component={CharacterSheets} />
          </div>
          <nav>
              <ul>
                  <li><Link to="/Game/Dice">Dice</Link></li>
                  <li><Link to="/Game/Chat">Chat</Link></li>
                  <li><Link to="/Game/Character">Character</Link></li>
                  <li><Link to="/Game/Characters">Characters</Link></li>
              </ul>
          </nav>
      </div>
      </div>
    </div>
  );
}
