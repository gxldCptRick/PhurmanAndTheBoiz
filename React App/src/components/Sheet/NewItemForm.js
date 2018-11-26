import React, {Component} from 'react';

export class ItemForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      playerID: props.id,
      name: '',
      type:'',
        damageRoll: '',
        attackBonus: ''
    }
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);    
    this.handleItemType = this.handleItemType.bind(this);    
    this.handleDamageRoll = this.handleDamageRoll.bind(this);    
    this.hadnleAttackBonus = this.hadnleAttackBonus.bind(this);
  }

  handleAddItem(){
    alert(JSON.stringify(this.state))
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
            <input type='text' className='col-md-9' onChange={this.handleDamageRoll} value={this.state.damageRoll} defaultValue={'Hello'} />
          </div>
          <div className='col-md-3'>
            <label className='col-md-3'>Attack Bonus</label>
            <input type='text' className='col-md-9' onChange={this.hadnleAttackBonus} value={this.state.attackBonus} defaultValue={'hello'} />
          </div>
        </div>
        <div className='row'>
          <button onClick={this.handleAddItem}>Add Item</button>
        </div>
      </div>
    );
  }
}