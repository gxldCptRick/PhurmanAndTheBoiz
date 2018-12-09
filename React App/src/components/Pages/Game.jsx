import React from "react";
import Canvas from "../Gameplay/Canvas";
import { Link } from "react-router-dom";
import { Route,Redirect } from "react-router";
import { DiceRoll } from "../Gameplay/DiceRoll";
import Chat from "../Gameplay/Chat";
import CharacterSheet from "../models/CharacterSheet";
import CharacterSheets from "../models/CharacterSheet";
import "./Game.css";
function RenderDiceRoll() {
  return <DiceRoll />;
}
 
function RenderChat() {
  return <Chat />;
}

function RenderCharacterSheet() {
  return <CharacterSheet />;
}

function RenderCharacterSheets() {
  return <CharacterSheets />;
}

export function Game(props) {
  if(localStorage.getItem('user') !== null){
    return (
      <div>
        <h2>Game</h2>
        <div className="row flex">
          <Canvas style={{ backgroundColor: "#50535b" }} />
          <div className="toolbar flex">
            <div>
              <Route exact path="/Game/Dice" component={RenderDiceRoll} />
              <Route exact path="/Game/Chat" component={RenderChat} />
              <Route
                exact
                path="/Game/Character"
                component={RenderCharacterSheet}
              />
              <Route
                exact
                path="/Game/Characters"
                component={RenderCharacterSheets}
              />
            </div>
            <nav>
              <ul>
                <li>
                  <Link to="/Game/Dice">Dice</Link>
                </li>
                <li>
                  <Link to="/Game/Chat">Chat</Link>
                </li>
                <li>
                  <Link to="/Game/Character">Character</Link>
                </li>
                <li>
                  <Link to="/Game/Characters">Characters</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }else{
    return <Redirect to={'/Account'}/>
  }
}
