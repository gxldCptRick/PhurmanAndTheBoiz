import React, { Component } from 'react';

export class RollDice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: 0,
    }
    this.handleRoll = this.handleRoll.bind(this);
  }

  handleRoll(event) {

    var min = 1;
    var max = 20;
    var rand = 0
    var isValid = false;
    while(!isValid){
      rand = min + (Math.random() * (max + min));
      rand = Math.floor(rand);
      if(rand >= min && rand <= max){
        isValid = true;
      }
    }
    this.setState({ result: rand});
  }

  render() {
    return (
      <div>
        <h2>{this.state.result}</h2>
        <button onClick={this.handleRoll}>Roll D20</button>
      </div>
    );
  }
}