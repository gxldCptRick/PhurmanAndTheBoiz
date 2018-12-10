import React from "react";
import CharacterSheet from "../Sheet/CharacterSheet";

import {
  RenderCharacterList,
  RenderItemList,
  options,
  RenderComboForChars,
  RenderComboForItems
} from "../../helpers/ProfileHelper";
import { GetResource, Resource } from "../../helpers/ApiService";
import { ItemForm } from "../Sheet/NewItemForm";
import { Redirect } from "react-router";
import ManageInventory from "../Sheet/AddInventory";
import { runInThisContext } from "vm";

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      uID: 0,
      characterData: [],
      characterItemData: [],
      itemData: [],
      characteIndex: 0,
      itemIndex: 0,
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
    this.ComboItem = this.ComboItem.bind(this);
    this.Ability = this.Ability.bind(this);
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
    if (this.state.isValid) {
      this.UpdateCharList();
      this.UpdateItemList();
    }
  }

  UpdateCharList(changeEvent) {
    this.setState({ option: null });
    GetResource(Resource.UserCharacter, this.state.uID)
      .then(response => response.json())
      .then(json => {
        this.setState({ characterData: json });
      })
      .then(() => {
        switch (changeEvent) {
          case "edit":
            this.changeMain(options.EditCharacter);
            break;
          case "add":
            this.changeMain(options.EditCharacter);
            break;
          case "remove":
            this.changeMain(options.CreateCharacter);
            break;
          default:
            this.changeMain();
            break;
        }
      });
  }

  UpdateItemList(changeEvent) {
    this.setState({ option: null });
    GetResource(Resource.UserItem, this.state.uID)
      .then(response => response.json())
      .then(json => {
        this.setState({ itemData: json });
      })
      .then(() => {
        switch (changeEvent) {
          case "edit":
            this.changeMain(options.EditCharacter);
            break;
          case "add":
            this.changeMain(options.EditCharacter);
            break;
          case "remove":
            this.changeMain(options.CreateCharacter);
            break;
          case "item":
            this.changeMain(options.AddItemToChar);
            break;
          default:
            this.changeMain();
            break;
        }
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
  ComboItem() {
    return RenderComboForItems(this.state.itemData);
  }

  Ability() {
    if (this.state.characterData[this.state.characteIndex] !== undefined) {
      return (
        <ManageInventory
          key={this.state.characterData[this.state.characteIndex]}
          cData={this.state.characterData[this.state.characteIndex]}
          idata={this.state.itemData}
          callback={this.UpdateCharList}
        />
      );
    } else {
      return null;
    }
  }

  renderMain() {
    console.log("RenderMain", this.state);
    switch (this.state.option) {
      case "createI":
        return (
          <ItemForm
            key="1"
            rID=""
            data=""
            uID={this.state.uID}
            callback={this.UpdateItemList}
          />
        );
      case "createC":
        return (
          <CharacterSheet
            key="0"
            rID=""
            data=""
            uID={this.state.uID}
            callback={this.UpdateCharList}
          />
        );
      case "editC":
        return (
          <CharacterSheet
            key={this.state.characterData[this.state.characteIndex].characterId}
            rID=""
            data={this.state.characterData[this.state.characteIndex]}
            uID={this.state.uID}
            callback={this.UpdateCharList}
          />
        );
      case "editI":
        return (
          <ItemForm
            key={this.state.itemData[this.state.itemIndex].itemId}
            rID=""
            data={this.state.itemData[this.state.itemIndex]}
            uID={this.state.uID}
            callback={this.UpdateItemList}
          />
        );
      case "addTo":
        return <this.Ability />;
      default:
        return <p>Edit Characters and weapoons Here</p>;
    }
  }

  cSelect(event) {
    this.setState({
      characteIndex: event.target.value,
      option: options.EditCharacter
    });
    this.setState({
      characterItemData: this.state.characterData[this.state.characteIndex]
        .inventory
    });
  }

  iSelect(event) {
    this.setState({
      characterItemData: [],
      itemIndex: event.target.value,
      option: options.EditItem
    });
  }

  render() {
    if (this.state.isValid) {
      console.log("Profile State in Render:", this.state);
      return (
        <div className="bod">
          <h1>Welcome to your Profile</h1>
          <div className="home">
            <div className="row">
              <div className="col-md-3">
                <div>
                  <img
                    src="https://via.placeholder.com/300x250.png?text=Milo+Screws+everybody+over"
                    alt="Img"
                  />
                </div>
                <div className="CharList">
                  <select
                    size="10"
                    value={this.state.itemIndex}
                    onClick={this.cSelect.bind(this)}
                  >
                    <this.ComboChar />
                  </select>
                  <button
                    onClick={this.changeMain.bind(
                      this,
                      options.CreateCharacter
                    )}
                  >
                    Create Character
                  </button>
                </div>
              </div>
              <div className="user">
                <div className="col-md-6">
                  <div className="row">
                    <label>Firstname</label>
                  </div>
                  <label>LastName</label>
                  <div>
                    <input value="UserName" type="text" />
                  </div>
                </div>
                <div className="CharChange">
                  <h3>Character Item List</h3>
                  <div className="row">
                    <button
                      onClick={this.changeMain.bind(this, options.CreateItem)}
                    >
                      Create New
                    </button>
                    <button>Delete Selected Item From Charcter</button>
                  </div>
                  <div className="list-box">
                    <this.CharItems />
                  </div>

                  <this.renderMain />
                </div>
              </div>
              <div className='mapThings'>
                <div className="col-md-3 ">
                  <h3>Maps</h3>
                  <div className="list-box" />
                  <h3>All Items</h3>
                  <div className="list-box">
                    <select
                      size="10"
                      value={this.state.itemIndex}
                      onClick={this.iSelect.bind(this)}
                    >
                      <this.ComboItem />
                    </select>
                  </div>
                  <div className="CharItem">
                    <h3>Character Item List</h3>
                    <div className="row">
                      <button
                        onClick={this.changeMain.bind(this, options.CreateItem)}
                      >
                        Create Item
                      </button>
                      <button
                        onClick={this.changeMain.bind(
                          this,
                          options.AddItemToChar
                        )}
                      >
                        Manage Character inventory
                      </button>
                    </div>
                    <div className="list-box">
                      <this.CharItems />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to={"/Login/SignIn"} />;
    }
  }
}
