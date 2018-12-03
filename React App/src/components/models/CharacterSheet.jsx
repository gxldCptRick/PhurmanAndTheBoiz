import React from "react";

export default function CharacterSheet(props) {
  return (
    <div key={props.characterId}>
      <h2>{props.characterName}</h2>
      <h3>{props.level}</h3>
    </div>
  );
}
