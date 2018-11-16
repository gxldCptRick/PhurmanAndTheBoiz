import React, { Component } from 'react';

export class Dice extends React.Component {

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
    var rand = min + (Math.random() * (max + min));
    this.setState({ result: rand});
  }

  render() {
    return (
      <h2>{this.state.result}</h2>
      <button onClick={this.handleRoll} value="Roll Dice" />
    );
  }
}