import React from "react";
import CharacterSheet from "../Sheet/CharacterSheet";
import {
  RenderCharacterList,
  RenderItemList,
  options,
  RenderComboForChars
} from "../../helpers/ProfileHelper";
import { GetResource, Resource } from "../../helpers/ApiService";
import { ItemForm } from "../Sheet/NewItemForm";
import { Redirect } from "react-router";

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      uID: 0,
      characterData: [],
      characterItemData: [],
      itemData: [],
      resourceId: "",
      option: ""
    };
    this.changeMain = this.changeMain.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.CharsList = this.CharsList.bind(this);
    this.CharItems = this.CharItems.bind(this);
    this.UserItems = this.UserItems.bind(this);
    this.UpdateCharList = this.UpdateCharList.bind(this);
    this.UpdateItemList = this.UpdateItemList.bind(this);
    this.ComboChar = this.ComboChar.bind(this);
  }
  componentWillMount() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      this.setState({ uID: user.user.id });
    } else {
      this.setState({ isValid: false });
    }
  }

  componentDidMount() {
    GetResource(Resource.Characters);
    if (this.state.isValid) {
      this.UpdateCharList();
      this.UpdateItemList();
    }
  }

  UpdateCharList() {
    GetResource(Resource.UserCharacter, this.state.uID)
      .then(response => response.json())
      .then(json => {
        this.setState({ characterData: json });
      });
  }

  UpdateItemList() {
    GetResource(Resource.UserItem, this.state.uID)
      .then(response => response.json())
      .then(json => {
        this.setState({ itemData: json });
      });
  }
  UserItems() {
    return RenderItemList(this.state.itemData);
  }
  CharItems() {
    return RenderItemList(this.state.characterItemData);
  }

  CharsList() {
    return RenderCharacterList(this.state.characterData);
  }

  changeMain(newOption) {
    this.setState({ option: newOption });
  }

  ComboChar() {
    return RenderComboForChars(this.state.characterData);
  }

  renderMain() {
    switch (this.state.option) {
      case "createI":
        return (
          <ItemForm
            key={this.state.resourceId}
            rID=""
            uID={this.state.uID}
            callback={this.UpdateItemList}
          />
        );
      case "createC":
        return (
          <CharacterSheet
            key={this.state.resourceId}
            rID=""
            uID={this.state.uID}
            callback={this.UpdateCharList}
          />
        );
      case "editC":
        return (
          <CharacterSheet
            key={this.state.resourceId}
            rID={this.state.resourceId}
            uID={this.state.uID}
            callback={this.UpdateCharList}
          />
        );
      case "editI":
        return (
          <ItemForm
            key={this.state.resourceId}
            rID={this.state.resourceId}
            uID={this.state.uID}
            callback={this.UpdateItemList}
          />
        );
      default:
        return <p>Edit Characters and weapoons Here</p>;
    }
  }

  cSelect(event) {
    this.setState({ resourceId: event.target.value });
    this.setState({ option: options.EditCharacter });
  }

  render() {
    if (this.state.isValid) {
      console.log("Profile State:", this.state);
      return (
        <div className='bod'>
          <div className="row">
            <div className="col-md-3">
              <img
                src="https://via.placeholder.com/300x250.png?text=Milo+Screws+everybody+over"
                alt="Img"
              />
            </div>
            <div className="col-md-6">
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

              <this.renderMain />
            </div>
            <select
              size="10"
              value={this.state.resourceId}
              onClick={this.cSelect.bind(this)}
            >
              <this.ComboChar />
            </select>

            <div className="col-md-3 ">
              <h3>Maps</h3>
              <button
                onClick={this.changeMain.bind(this, options.CreateCharacter)}
              >
                Create Character
              </button>
              <div className="list-box" />

              <h3>All Items</h3>
              <div className="list-box">
                <this.UserItems />
                <this.CharsList />
              </div>
            </div>

            <h3>Character Item List</h3>
            <div className="row">
              <button onClick={this.changeMain.bind(this, options.CreateItem)}>
                Create New
              </button>
              <button>Delete Selected Item From Charcter</button>
            </div>
            <div className="list-box">
              <this.CharItems />
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to={"/Account"} />;
    }
  }
}
