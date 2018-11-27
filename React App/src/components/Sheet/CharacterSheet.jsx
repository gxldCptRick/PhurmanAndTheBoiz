import React, {Component} from 'react';
import { ItemForm } from './NewItemForm';
import { Stats } from './CharacterStats';

export class CharacterSheet extends Component {
  constructor(props) {
  super(props)
  this.state= {
      characterId: 1,
      userId: 1,
      characterName: 'The Big Gey',
      class: "Warrior",
      alignment: "Chaotic Neutral",
      experiencePoints: 0,
      stats: {
        strength: 30,
        dexterity: 12,
        constitution: 12,
        intelligence: 2,
        wisdom: 20,
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
    };
  this.renderItem = this.renderItem.bind(this);
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
    return(renderedItem);
  }

  changeName(event){
    this.setState({characterName: event.target.characterName})
  }

  changeClass(event){
    this.setState({class: event.target.value})
  }

  changeAlighnment(event){
    this.setState({alignment: event.target.value})
  }

  changeXP(event){
    this.setState({experiencePoints: event.target.value})
  }

  changeGold(event){
    this.setState({gold: event.target.value})
  }

  changeStrength(event){
    this.setState({stats:{...this.state.stats,strength:event.target.strength} })
  }

  changeDexterity(event){
    this.setState({stats:{...this.state.stats,dexterity:event.target.dexterity} })
  }

  changeConstitution(event){
    this.setState({stats:{...this.state.stats,constitution:event.target.constitution} })
  }

  changeIntelligence(event){
    this.setState({stats:{...this.state.stats,intelligence:event.target.intelligence} })
  }

  changeWisdom(event){
    this.setState({stats:{...this.state.stats,wisdom:event.target.wisdom} })
  }

  changeCharisma(event){
    this.setState({stats:{...this.state.stats,charisma:event.target.charisma} })
  }

  changeSavingStrength(event){
    this.setState({savingThrows:{...this.state.savingThrows,strength:event.target.strength} })
  }

  changeSavingDexterity(event){
    this.setState({savingThrows:{...this.state.savingThrows,dexterity:event.target.dexterity} })
  }

  changeSavingConstitution(event){
    this.setState({savingThrows:{...this.state.savingThrows,constitution:event.target.constitution} })
  }

  changeSavingIntelligence(event){
    this.setState({savingThrows:{...this.state.savingThrows,intelligence:event.target.intelligence} })
  }

  changeSavingWisdom(event){
    this.setState({savingThrows:{...this.state.savingThrows,wisdom:event.target.wisdom} })
  }

  changeSavingCharisma(event){
    this.setState({savingThrows:{...this.state.savingThrows,charisma:event.target.charisma} })
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
          <input type='text' value={this.state.characterName} onChange={this.changeName.bind(this)}/>
        </div>
      </div>
      <div className='col-md-4'>
        <label className='control-label col-md-12'>Class</label>
        <div className='col-md-12'>
          <input type='text' value={this.state.class} onChange={this.changeClass.bind(this)}/>
        </div>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6'>
        <label className='control-label col-md-12'>Alignment</label>
        <div className='col-md-12'>
          <input type='text' value={this.state.alignment} onChange={this.changeAlighnment.bind(this)}/>
        </div>
      </div>
      <div className='col-md-3'>
        <label className='control-label col-md-12'>XP</label>
        <div className='col-md-12'>
          <input type='text' value={this.state.experiencePoints} onChange={this.changeXP.bind(this)}/>
        </div>
      </div>
      <div className='col-md-3'>
        <label className='control-label col-md-12'>Gold</label>
        <div className='col-md-12'>
          <input type='text' value={this.state.gold} onChange={this.changeGold.bind(this)}/>
        </div>
      </div>
    </div>
    <h3>Stats</h3>
    <Stats
     state={this.state.stats}
      strengthStat={this.changeStrength.bind(this)}
      dexterityStat={this.changeDexterity.bind(this)}
      constitutionStat={this.changeConstitution.bind(this)}
      intelligenceStat={this.changeIntelligence.bind(this)}
      wisdomStat={this.changeWisdom.bind(this)}
      charismaStat={this.changeCharisma.bind(this)}
      ></Stats>
    <h4>Save Throws</h4>
    <Stats 
      state={this.state.savingThrows}
      strengthStat={this.changeSavingStrength.bind(this)}
      dexterityStat={this.changeSavingDexterity.bind(this)}
      constitutionStat={this.changeSavingConstitution.bind(this)}
      intelligenceStat={this.changeSavingIntelligence.bind(this)}
      wisdomStat={this.changeSavingWisdom.bind(this)}
      charismaStat={this.changeSavingCharisma.bind(this)} 
      />
    <h3>Invetory</h3>
    <h4>Current items</h4>
    <this.renderItem items={this.state.inventory}></this.renderItem>
    <h4>Add Item</h4>
    <ItemForm id={this.state.userId}></ItemForm>
    <h3>Description</h3>
    <div className='row'>
      <div className='col-md-12'>
        <label className='control-label col-md-12'>Description</label>
        <input type='text' />
      </div>
    </div>
  </div>
  );
  }
}