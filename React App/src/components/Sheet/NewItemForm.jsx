
import React, {Component} from 'react';
import { Resource, PutToResource, PostToResource } from '../../helpers/ApiService';
export class ItemForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      isNew: true,
      iID: 0,
      cID: 0,
      uID: 0,
      name: '',
      type:'',
      damageRoll: '',
      attackBonus: ''
    }

    this.renderButton = this.renderButton.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);    
    this.handleItemType = this.handleItemType.bind(this);    
    this.handleDamageRoll = this.handleDamageRoll.bind(this);    
    this.hadnleAttackBonus = this.hadnleAttackBonus.bind(this);
  }

  componentWillMount(){
    this.setState({isNew: this.props.isNew})
    this.setState({uID: this.props.uID})
  }

  handleAddItem(){
    var item={
      userId: this.state.uID,
      itemType: this.state.type,
      itemName: this.state.name,
      stats: {
        DamageRoll: this.state.damageRoll,
        AttackBonus: this.state.attackBonus
      }
    }
    if(this.state.isNew){
      PostToResource(Resource.Items,item)
    }else{
      PutToResource(Resource.Items,this.state.uID,item)
    }
  }

  renderButton(){
    if(this.state.isNew){
        return <button onClick={this.handleAddItem}>Add</button>
    }else{
        return <button onClick={this.handleAddItem}>Update</button>
    }
  }

  handleNameChange(e){
    this.setState({name: e.target.value})
  }

  handleItemType(e){
    this.setState({itemType: e.target.value})
  }

  handleDamageRoll(e){
    this.setState({damageRoll: e.target.value})
  }
  hadnleAttackBonus(e){
    this.setState({attackBonus: e.target.value})
  }

  render(){
    return(
      <div>
        <div className='row'>
          <div className='col-md-3'>
            <label className='col-md-3'>Item Name</label>
            <input type='text' className='col-md-9' onChange={this.handleNameChange} value={this.state.itemName} />
          </div>
          <div className='col-md-3'>
            <label className='col-md-3'>Type</label>
            <input type='text' className='col-md-9' onChange={this.handleItemType} value={this.state.itemType} />
          </div>
          <div className='col-md-3'>
            <label className='col-md-3'>Damage Roll</label>
            <input type='text' className='col-md-9' onChange={this.handleDamageRoll} value={this.state.damageRoll} />
          </div>
          <div className='col-md-3'>
            <label className='col-md-3'>Attack Bonus</label>
            <input type='text' className='col-md-9' onChange={this.hadnleAttackBonus} value={this.state.attackBonus}/>
          </div>
        </div>
        <this.renderButton/>
      </div>
    );
  }
}