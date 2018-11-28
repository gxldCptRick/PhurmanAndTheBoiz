import React from "react";
export default function CharacterSheet(props) {
  return (<li>
      <h3>{props.characterName} lv.{props.level} </h3>
  </li>);
}
