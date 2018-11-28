import React from "react";
import { CharacterSheet } from "../models/CharacterSheet";
export default class Characters extends React.Component {
  constructor(props) {
    super(props);
    fetch("http://localhost:60434/api/dnd/characterSheet")
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({ thing: [...jsonResponse] });
        return jsonResponse;
      })
      .then(json => console.log(json))
      .catch(err => console.log(err));
    this.state = {
      thing: []
    };
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
