import React, { Component } from "react";
export class Home extends Component {
  displayName = Home.name;

  render() {
    return (
      <div className="bod">
        <h1>Dungeon Rollers</h1>
        <div className='home'>
          <p className="Ptag">
            Welcome to Dungeon Rollers!! We are a custom game site to play the newest version on Dungeon and Dragons fifth edition.
            We have built in many different features we thought would benefit the people playing the game, such as a dice roller. 
            It is really amazing having you here to enjoy our site. As of now we do not have much of a way for you to communicate with us but if 
            you would like please email us at something@something.org.
            }
          </p>
        </div>
      </div>
    );
  }
}
