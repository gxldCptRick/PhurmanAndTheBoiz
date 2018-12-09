import React from "react";
export default function CharacterSheet(props) {
  return (
    <div className ='navChars'>
      <li>
        <p>
          {props.characterName} lv.{props.level}{" "}
        </p>
      </li>
    </div>
  );
}
