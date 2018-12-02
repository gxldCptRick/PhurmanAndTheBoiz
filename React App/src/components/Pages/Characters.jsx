import React from "react";
import CharacterSheet from "../models/CharacterSheet";
export default class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || []
    };
  }
  render() {
    return (
      <div>
        <h1>Characters</h1>
        <div className="CharactersDisplay">
          {this.state.data.map(element => (
            <CharacterSheet key={element.characterId} {...element} />
          ))}
        </div>
      </div>
    );
  }
}
