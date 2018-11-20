import React, {Component} from 'react';

export class CharacterSheet extends Component {
  constructor(props) {
  super(props)
  this.state = {
    sheet:{
      characterId: 1,
      userId: 1,
      characterName: "The Big Gey",
      class: "Warrior",
      alignment: "Chaotic Neutral",
      experiencePoints: 0,
      stats: {
        strength: 30,
        dexterity: 12,
        constitution: 12,
        intelligence: 2,
        wisdom: 2,
        charisma: 10
      },
      inspiration: 0,
      savingThrows: {
        strength: 30,
        dexterity: 12,
        constitution: 12,
        intelligence: 2,
        wisdom: 20,
        charisma: 10
      },
      inventory: [
        {
        itemId: 1,
        itemType: "equip",
        itemName: "random string",
        stats: {
        damageRoll: "2d6",
        attackBonus: 2
        }
        }
      ],
      gold: 22,
      description: ""
    },
    item: {
      itemName:'',
      itemType:'',
      stats:{
      damageRoll: '1d20',
      attackBonus: 0
      }
    }
  }
  this.renderItem = this.renderItem.bind(this);
  this.handleAddItem = this.handleAddItem.bind(this);
  this.handleNewItemNameChange = this.handleNewItemNameChange.bind(this);
  this.handleNewItemTypeChange = this.handleNewItemTypeChange.bind(this);
  this.handleNewItemDamageChange = this.handleNewItemDamageChange.bind(this);
  this.handleNewItemBonusChange = this.handleNewItemBonusChange.bind(this);
  this.stateJSON = this.stateJSON.bind(this);
  this.itemJSON = this.itemJSON.bind(this);
}

  handleAddItem(e){
  this.props.inventory.push(e.target.value);
  alert(JSON.stringify(this.state))
  }

  handleNewItemNameChange(e){
    this.setState({itemName: e.target.value})
  }

  handleNewItemTypeChange(e){
  this.state.item.type = e.target.value;
  }

  handleNewItemDamageChange(e){
  this.state.item.stats.damageRoll = e.target.value;
  }

  handleNewItemBonusChange(e){
    this.state.item.attackBonus = e.target.value;
  }

  itemJSON(e){
  alert(JSON.stringify(this.state.item))
  }

  stateJSON(e){
  alert(JSON.stringify(this.state.sheet))
  }

  renderItem(inv){

  var renderedItem = inv.items.map((i) =>
  <div key={i.itemId}>
    <h4>{i.itemName}</h4>
    <div className='row'>
      <div className='col-md-4'>
        <label className='col-md-3'>Type</label>
        <input readOnly type='text' className='col-md-9' value={i.itemType}></input>
      </div>
      <div className='col-md-4'>
        <label className='col-md-3'>Damage Roll</label>
        <input readOnly className='col-md-9' value={i.stats.damageRoll}></input>
      </div>
      <div className='col-md-4'>
        <label className='col-md-3'>Attack Bonus</label>
        <input readOnly className='col-md-9' value={i.stats.attackBonus}></input>
      </div>
    </div>
  </div>
  );
  return(
  renderedItem
  );
  }

  render() {
  return (
  <div>
    <h2> Character Sheet </h2>
    <h3>General</h3>
    <div className='row'>
      <div className='col-md-8'>
        <label className='control-label col-md-12'>Character Name</label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-4'>
        <label className='control-label col-md-12'>Class</label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6'>
        <label className='control-label col-md-12'>Alignment</label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-3'>
        <label className='control-label col-md-12'>XP</label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-3'>
        <label className='control-label col-md-12'>Gold</label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
    </div>
    <h3>Stats</h3>
    <div className='row'>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Strength </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Dexterity </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Constitution </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Intelligence </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Wisdom </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Charisma </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
    </div>
    <h4>Save Throws</h4>
    <div className='row'>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Strength </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Dexterity </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Constitution </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Intelligence </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Wisdom </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Charisma </label>
        <div className='col-md-12'>
          <input type='text' />
        </div>
      </div>
    </div>
    <h3>Invetory</h3>
    <h4>Current items</h4>
    <this.renderItem items={this.state.sheet.inventory}></this.renderItem>
    <h4>Add Item</h4>

    <h3>Description</h3>
    <div className='row'>
      <div className='col-md-12'>
        <label className='control-label col-md-12'>Description</label>
        <input type='text' />
      </div>
    </div>
    <div className='row'>
      <button value={this.state.item} onClick={this.itemJSON}>New Item State</button>
    </div>
    <div className='row'>
      <button value={this.state.item} onClick={this.stateJSON}>State State</button>
    </div>
  </div>
  );
  }
}