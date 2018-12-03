import React from "react";
import Characters from "./Characters";

let mockData = [
  {
    characterName: "Leeroy Jenkins",
    characterId: "bestid",
    level: 44
  },
  {
    characterName: "Hermoine Granger",
    characterId: "420blazeit",
    level: 69
  }
];

export default class ProfilePage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <img src="https://via.placeholder.com/300x250.png?text=Milo+Screws+everybody+over" />
          <Characters data={mockData} />
        </div>

        <div className="col-md-6">
          <div>
            <div>
              <label>Firstname</label>
            </div>

            <div>
              <label>LastName</label>
            </div>

            <div>
              <input value="UserName" type="text" />
            </div>

            <div>
              <input value="Change User Name" type="button" />
            </div>

            <div>
              <input value="Password" type="text" />
            </div>

            <div>
              <input value="Change Password" type="button" />
            </div>
          </div>

          <div>
            <p>Div placeholder for character sheet component</p>
          </div>
        </div>

        <div className="col-md-3 ">
          <h3>Game thing</h3>
          <div className="list-box">
            <ul>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
            </ul>
          </div>

          <h3>Game thing</h3>
          <div className="list-box">
            <ul>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
            </ul>
          </div>

          <h3> I don't remeber what the title was</h3>
          <div className="list-box">
            <ul>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
              <li>placeholder</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
