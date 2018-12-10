import React from 'react';
import { RenderComboForItems, options, changes } from '../../helpers/ProfileHelper';
import { Resource, GetResource, RegisterUser, PutToResource } from '../../helpers/ApiService';

export default class ManageInventory extends React.Component{
  constructor(props){
    super(props);
    this.state={
      characterData:{},
      itemData:[],
      index:0,
    }

    this.title = this.title.bind(this);
    this.renderItemBox = this.renderItemBox.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.iSelect = this.iSelect.bind(this)

  }

  componentWillMount(){
    if(this.props.cData !== ''){
      this.setState({characterData: this.props.cData,})
    }
  }

  componentDidMount(){
    if(this.props.iData !== ''){
      this.setState({itemData: this.props.idata})
    }
  }

  removeItem(){

  }

  addItem(){
    var inv = Object.assign([],this.state.characterData.inventory);
    inv.push(this.state.itemData[this.state.index]);
    this.setState({characterData:{...this.state.characterData, inventory: inv}})
  }
  
  handleChange(){
    PutToResource(Resource.Characters,this.state.characterData.characterId,this.state.characterData)
    .then(() => this.props.callback(changes.edit))
  }

  iSelect(event){
    this.setState({index: event.target.value})
  }

  title(){
    return(
      <div>
        <h3>Inventory for {this.state.characterData.characterName}</h3>
      </div>
    )
  }
  renderItemBox(){
    return RenderComboForItems(this.state.itemData)
  }

  alreadyInInventory(){
    var inv = this.state.characterData.inventory;
    var selectedItemId = this.state.itemData[this.state.index].itemId;
    for(var i = 0; i < inv.length ; i++){
      if(selectedItemId === inv[i].itemId){
        return true;
      }
    }
    return false;
  }

  renderButton(){
    if(this.state.itemData.length >= 1){
      if(this.alreadyInInventory()){
        return(
        <div>
          <button onClick={this.removeItem}>Remove From Inventory</button>
          <button onClick={this.handleChange.bind(this)}>Save Changes</button>        
        </div>
          )
      }else{
        return (
          <div>
            <button onClick={this.addItem}>Add To Inventory</button>
            <button onClick={this.handleChange.bind(this)}>Save Changes</button>        
          </div>
          )
      }

    }else{
      return null;
    }
  }

  render(){
    console.log('ayy',this.state)
    return(
      <div className='col-md-12'>
        <div className='row'>
          <this.title/>
        </div>
        <div className='row list-box'>
        <select size='10' value={this.state.index} onChange={this.iSelect}>
          <this.renderItemBox/>
        </select>
        </div>
        <div className='row'>
          <this.renderButton/>
        </div>
      </div>
    );
  }
}