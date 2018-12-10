import React, {Component} from 'react';
import { Stats } from './CharacterStats';
import { Resource, PutToResource, PostToResource, GetResource, DeleteResource } from '../../helpers/ApiService';
import {changes} from '../../helpers/ProfileHelper'

export default class CharacterSheet extends Component {
  constructor(props) {
  super(props)
  this.state= {
    c:{
      characterId: '',
      userId: '',
      characterName: '',
      class: '',
      alignment: '',
      experiencePoints: '0',
      level: '1',
      inspiration: '1',
      stats: {
        strength: '1',
        dexterity: '1',
        constitution: '1',
        intelligence: '1',
        wisdom: '1',
        charisma: '1'
      },
      inspiration: '1',
      savingThrows: {
        strength: '1',
        dexterity: '1',
        constitution: '1',
        intelligence: '1',
        wisdom: '1',
        charisma: '1'
      },
      inventory: [
      ],
      gold: 1,
      description: ""      
    }

    };
  this.renderButton = this.renderButton.bind(this);
}

componentWillMount(){
  this.setState({c:{...this.state.c, userId: this.props.uID}})
}

componentDidMount(){
  if(this.props.rID !== ''){
    GetResource(Resource.Characters, this.props.rID)
    .then(Response => Response.json())
    .then(json => this.setState({c: json}))
  }else if(this.props.data !== ''){
    this.setState({c: this.props.data})
  }
}

handleButtonPush(){
  if(this.state.c.characterId !== ''){
    PutToResource(Resource.Characters,this.state.c.characterId,this.state.c)
    .then(() => this.props.callback(changes.edit))
    
  }else{
    PostToResource(Resource.Characters,this.state.c)
    .then(() => this.props.callback(changes.add))
  }
}

handleRemoval(){
  DeleteResource(Resource.Characters,this.state.c.characterId)
  .then(() => this.props.callback(changes.remove))
}
  

renderButton(){
  if(this.state.c.characterId !== ''){
    return(
      <div>
        <button onClick={this.handleButtonPush.bind(this)}>Save Changes</button>
        <button onClick={this.handleRemoval.bind(this)}>Remove Character</button>
      </div>
    );
  }else{
    return <button onClick={this.handleButtonPush.bind(this)}>Add Character</button>
  }
}
  changeName(event){
    this.setState({c:{...this.state.c, characterName: event.target.value}})
  }

  changeClass(event){
    this.setState({c:{...this.state.c, class: event.target.value}})
  }

  changeAlighnment(event){
    this.setState({c:{...this.state.c, alignment: event.target.value}})
  }

  changeXP(event){
    this.setState({c:{...this.state.c, experiencePoints: event.target.value}})
  }

  changeGold(event){
    this.setState({c:{...this.state.c, gold: event.target.value}})
  }

  changeStrength(event){
    let stats = Object.assign({},this.state.c.stats)
    stats.strength = event.target.value;
    this.setState({c:{...this.state.c, stats}})
  }

  changeDexterity(event){
    let stats = Object.assign({},this.state.c.stats)
    stats.dexterity = event.target.value;
    this.setState({c:{...this.state.c, stats}})  }

  changeConstitution(event){
    let stats = Object.assign({},this.state.c.stats)
    stats.constitution = event.target.value;
    this.setState({c:{...this.state.c, stats}})  }

  changeIntelligence(event){
    let stats = Object.assign({},this.state.c.stats)
    stats.intelligence = event.target.value;
    this.setState({c:{...this.state.c, stats}})  }

  changeWisdom(event){
    let stats = Object.assign({},this.state.c.stats)
    stats.wisdom = event.target.value;
    this.setState({c:{...this.state.c, stats}})  }

  changeCharisma(event){
    let stats = Object.assign({},this.state.c.stats)
    stats.charisma = event.target.value;
    this.setState({c:{...this.state.c, stats}})  }

  changeSavingStrength(event){
    let savingThrows = Object.assign({},this.state.c.savingThrows)
    savingThrows.strength = event.target.value;
    this.setState({c:{...this.state.c, savingThrows}})  }

  changeSavingDexterity(event){
    let savingThrows = Object.assign({},this.state.c.savingThrows)
    savingThrows.dexterity = event.target.value;
    this.setState({c:{...this.state.c, savingThrows}})  }

  changeSavingConstitution(event){
    let savingThrows = Object.assign({},this.state.c.savingThrows)
    savingThrows.constitution = event.target.value;
    this.setState({c:{...this.state.c, savingThrows}})  }

  changeSavingIntelligence(event){
    let savingThrows = Object.assign({},this.state.c.savingThrows)
    savingThrows.intelligence = event.target.value;
    this.setState({c:{...this.state.c, savingThrows}})  }

  changeSavingWisdom(event){
    let savingThrows = Object.assign({},this.state.c.savingThrows)
    savingThrows.wisdom = event.target.value;
    this.setState({c:{...this.state.c, savingThrows}})  }

  changeSavingCharisma(event){
    let savingThrows = Object.assign({},this.state.c.savingThrows)
    savingThrows.charisma = event.target.value;
    this.setState({c:{...this.state.c, savingThrows}})  }

  changeInspiration(event){
    this.setState({c:{...this.state.c, inspiration: event.target.value}})
  }

  changeLevel(event){
    this.setState({c:{...this.state.c, level: event.target.value}})
  }

  changeDescription(event){
    this.setState({c:{...this.state.c, description: event.target.value}})

  }

  render() {
  return (
  <div className='col-md-12'>
    <h2> Character Sheet </h2>
    <h3>General</h3>
    <div className='row'>
      <div className='col-md-6'>
        <label className='control-label col-md-12'>Character Name</label>
        <div className='col-md-12'>
          <input type='text' value={this.state.c.characterName} onChange={this.changeName.bind(this)}/>
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label'>Class</label>
        <div className='col-md-12'>
          <input type='text' value={this.state.c.class} onChange={this.changeClass.bind(this)}/>
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'>level</label>
        <div className='col-md-12'>
          <input type='number' value={this.state.c.level} onChange={this.changeLevel.bind(this)}/>
        </div>
      </div> 
      <div className='col-md-2'>
        <label className='control-label col-md-12'>XP</label>
        <div className='col-md-12'>
          <input type='number' value={this.state.c.experiencePoints} onChange={this.changeXP.bind(this)}/>
        </div>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6'>
        <label className='control-label col-md-12'>Alignment</label>
        <div className='col-md-12'>
          <input type='text' value={this.state.c.alignment} onChange={this.changeAlighnment.bind(this)}/>
        </div>
      </div>
      <div className='col-md-3'>
        <label className='control-label col-md-12'>inspiration</label>
        <div className='col-md-12'>
          <input type='number' value={this.state.c.inspiration} onChange={this.changeInspiration.bind(this)}/>
        </div>
      </div>
      <div className='col-md-3'>
        <label className='control-label col-md-12'>Gold</label>
        <div className='col-md-12'>
          <input type='number' value={this.state.c.gold} onChange={this.changeGold.bind(this)}/>
        </div>
      </div>
    </div>
    <h3>Stats</h3>
    <Stats
     state={this.state.c.stats}
      strengthStat={this.changeStrength.bind(this)}
      dexterityStat={this.changeDexterity.bind(this)}
      constitutionStat={this.changeConstitution.bind(this)}
      intelligenceStat={this.changeIntelligence.bind(this)}
      wisdomStat={this.changeWisdom.bind(this)}
      charismaStat={this.changeCharisma.bind(this)}
      ></Stats>
    <h4>Save Throws</h4>
    <Stats 
      state={this.state.c.savingThrows}
      strengthStat={this.changeSavingStrength.bind(this)}
      dexterityStat={this.changeSavingDexterity.bind(this)}
      constitutionStat={this.changeSavingConstitution.bind(this)}
      intelligenceStat={this.changeSavingIntelligence.bind(this)}
      wisdomStat={this.changeSavingWisdom.bind(this)}
      charismaStat={this.changeSavingCharisma.bind(this)} 
      />
    <h3>Description</h3>
    <div className='row'>
      <div className='col-md-12'>
        <label className='control-label col-md-12'>Description</label>
        <textarea  value={this.state.c.description} onChange={this.changeDescription.bind(this)}/>
      </div>
    </div>
    <this.renderButton/>
  </div>
  );
  }
}