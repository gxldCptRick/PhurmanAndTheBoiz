import React from "react";
import  CharacterSheet  from "../models/CharacterSheet";
export default class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.state =  props.state;
    this.state = {
      thing: []
    }
  }
  render() {
    return (
      <div>
        <h1>Characters</h1>
        {this.state.thing.map(element => (
          <CharacterSheet key={element.characterId} {...element} />
        ))}
      </div>
    );
  }
}
