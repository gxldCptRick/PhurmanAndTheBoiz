import React, { Component } from 'react';
import Chat from './Chat';
import Canvas from './Canvas'

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
