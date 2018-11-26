import React, {Component} from  'react'

export class Item extends Component{

  constructor(props){
    super(props);
    this.setState={
      itemName: props.itemName,
      itemtype: props.itemtype,
      stats:{
        damageRoll: props.damageRoll,
        attackBonus: props.attackBonus
      }
    }
  }
  
  render(){
    return(
      <div>
        <h4>{this.state.itemName}</h4>
        <div className='row'>
          <div className='col-md-4'>
            <label className='col-md-3'>Type</label>
            <p className='col-md-9'>{this.state.itemtype}</p>
          </div>
          <div className='col-md-4'>
            <label className='col-md-3'>Damage Roll</label>
            <p className='col-md-9'>{this.state.stats.damageRoll}</p>
          </div>
          <div className='col-md-4'>
            <label className='col-md-3'>Attack Bonus</label>
            <p className='col-md-9'>{this.state.stats.attackBonus}</p>
          </div>
        </div>
      </div>
    );
  }
}