import React, {Component} from 'react';

export class ItemFomr extends Component{
  constructor(props){
    this.state = {
      
    }
  }

  render(){
    return(
      <form>
      <div className='row'>
        <div className='col-md-3'>
          <label className='col-md-3'>Item Name</label>
          <input type='text' className='col-md-9' onChange={this.handleNewItemNameChange} value={this.state.item.itemName} />
        </div>
        <div className='col-md-3'>
          <label className='col-md-3'>Type</label>
          <input type='text' className='col-md-9' onChange={this.handleNewItemTypeChange} value={this.state.item.itemType} />
        </div>
        <div className='col-md-3'>
          <label className='col-md-3'>Damage Roll</label>
          <input type='text' className='col-md-9' onChange={this.handleNewItemDamageChange} value={this.state.item.stats.damageRoll} />
        </div>
        <div className='col-md-3'>
          <label className='col-md-3'>Attack Bonus</label>
          <input type='text' className='col-md-9' onChange={this.handleNewItemBonusChange} value={this.state.item.stats.attackBonus} />
        </div>
      </div>
      <div className='row'>
        <button value={this.state} onClick={this.handleAddItem}>Add Item</button>
      </div>
    </form>
    );
  }
}