import React from "react";

export function CharacterSheet(props) {
  return (
    <div key={props.characterId}>
      <h2>{props.characterName}</h2>
    </div>
  );
}
