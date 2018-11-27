import React, { Component } from "react";
import { RollADice } from "../../helpers/RollADice";
export class RollDice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTheDiceRolls: [],
      totalAmount: 0
    };
    this.handleRoll = this.handleRoll.bind(this);
  }

  handleRoll(event) {
    this.setState(RollADice(this.state.roll));
  }

  handleStuff(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="bod">
        <h2>
          Rolls:
          {this.state.allTheDiceRolls.map(element => ` [${element}] `)}
        </h2>
        <h3>{this.state.totalAmount}</h3>
        <input
          value={this.state.roll}
          onSubmit={this.handleStuff}
          type="text"
          onChange={event => this.setState({ roll: event.target.value })}
        />
        <button onClick={this.handleRoll}>Roll</button>
      </div>
    );
  }
}
