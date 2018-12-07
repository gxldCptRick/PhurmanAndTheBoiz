import React from "react";
import CharacterSheet from "../Sheet/CharacterSheet";
import {RenderCharacterList, RenderItemList,options} from '../../helpers/ProfileHelper'
import { GetResource,Resource } from "../../helpers/ApiService";
import { ItemForm } from "../Sheet/NewItemForm";
import { Redirect } from "react-router";

export default class ProfilePage extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isValid: true,
      uID: 0,
      characterData: [],
      characterItemData:[],
      userItem: [],
      currentCharIndex: 0,
      option: 'createC'
    }
    this.changeMain = this.changeMain.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.CharsList = this.CharsList.bind(this);
    this.CharItems = this.CharItems.bind(this);
    this.UserItems = this.UserItems.bind(this);
  }
  componentWillMount(){
    var user = JSON.parse(localStorage.getItem('user'));
    if(user !== null){
      this.setState({uID: user.user.id})   
    }else{
      this.setState({isValid: false})
    }
}

  componentDidMount(){
    if(this.state.isValid){
      GetResource(Resource.UserCharacter,this.state.uID)
      .then(response => response.json())
      .then(json =>{
        this.setState({characterData: json});
      })

      GetResource(Resource.UserItem,this.state.uID)
      .then(response => response.json())
      .then(json => this.setState({userItem: json}))    
    }
  }


UserItems(){
  return RenderItemList(this.state.userItem);
}

  CharItems(){
    return RenderItemList(this.state.characterItemData);
  }

  CharsList(){
    return RenderCharacterList(this.state.characterData);
  }

  changeMain(newOption){
    this.setState({option: newOption},() => console.log('callback state',this.state.uID))
  }

  renderMain(){
    switch(this.state.option){
      case 'createI':
        return <ItemForm isNew={true} uID={this.state.uID}/>
      case 'createC':
        return <CharacterSheet uID={''} callback={this.CharsList}/>
      case 'editC':
        return <CharacterSheet uID={this.state.uID} callback={this.CharsList}/>
      case 'editI':
        return <ItemForm isNew={false} uID={this.state.uID}/>
      default:
        return null
    }
  }

  render() {
    if(this.state.isValid){
      console.log('state of profile',this.state)
      return (
      <div className='row'>
        <div className="col-md-3">
          <img src="https://via.placeholder.com/300x250.png?text=Milo+Screws+everybody+over" alt='Img'/>
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
            <this.renderMain/>
        </div>

        <div className="col-md-3 ">
          <h3>Maps</h3>
          <button onClick={this.changeMain.bind(this,options.CreateCharacter)}>Create Character</button>
          <div className="list-box">
          </div>

          <h3>All Items</h3>
          <div  className='list-box'>
            <this.UserItems/>
          <this.CharsList/>
          </div>
          </div>

          <h3>Character Item List</h3>
          <div className='row'>
            <button onClick={this.changeMain.bind(this,options.CreateItem)}>Create New</button>
            <button>Delete Selected Item From Charcter</button>
          </div>
          <div className="list-box">
            <this.CharItems/>
          </div>
        </div>
    )      
    }else{
      return <Redirect to={'/Account'}/>
    }
  }
}


