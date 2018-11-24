import React, { Component } from 'react';
import Canvas from '../Gameplay/Canvas'

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div className = "bod">
        <h1>Dungeon Rollers</h1>
        <Canvas style={{background: "yellow"}}></Canvas>
      </div>
    );
  }
}
