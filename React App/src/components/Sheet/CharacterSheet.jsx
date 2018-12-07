import React, {Component} from 'react';
import { Stats } from './CharacterStats';
import { Resource, PutToResource, PostToResource, GetResource } from '../../helpers/ApiService';

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
      experiencePoints: '',
      stats: {
        strength: '',
        dexterity: '',
        constitution: '',
        intelligence: '',
        wisdom: '',
        charisma: ''
      },
      inspiration: '',
      savingThrows: {
        strength: '',
        dexterity: '',
        constitution: '',
        intelligence: '',
        wisdom: '',
        charisma: ''
      },
      inventory: [
      ],
      gold: 0,
      description: ""      
    }

    };
  this.handleButtonPush = this.handleButtonPush.bind(this);
  this.renderButton = this.renderButton.bind(this);
}

componentWillMount(){
  this.setState({c:{...this.state.c, userId: this.props.uID}})
  this.setState({c:{...this.state.c,characterId: this.props.uID}})
}

componentDidMount(){
  if(this.state.c.characterId !== ''){
    GetResource('id passed',Resource.Characters,this.state.characterId)
  }
}

handleButtonPush(){
  if(this.state.c.characterId !== ''){
    PutToResource(Resource.Characters, this.state.c.characterId,this.state.c)
  }else{
    PostToResource(Resource.Characters,this.state.c.userId);
  }
  this.props.callback();
}

renderButton(){
  if(this.state.c.characterId !== ''){
    return(
      <button onClick={this.handleButtonPush}>Save Changes</button>
    );
  }else{
    return(
      <button onClick={this.handleButtonPush}>Add Character</button>
    );  
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
    this.setState({c:{...this.state.c, stats:{stregth: event.target.value}} })
  }

  changeDexterity(event){
    this.setState({c:{...this.state.c, stats:{dexterity:event.target.value}} })
  }

  changeConstitution(event){
    this.setState({c:{...this.state.c, stats:{constitution:event.target.value}} })
  }

  changeIntelligence(event){
    this.setState({c:{...this.state.c, stats:{intelligence:event.target.value}} })
  }

  changeWisdom(event){
    this.setState({c:{...this.state.c,stats:{wisdom:event.target.value}}})
  }

  changeCharisma(event){
    this.setState({c:{...this.state.c,stats:{charisma:event.target.value}}})
  }

  changeSavingStrength(event){
    this.setState({c:{...this.state.c, savingThrows:{strength:event.target.value}}})
  }

  changeSavingDexterity(event){
    this.setState({c:{...this.state.c, savingThrows:{dexterity:event.target.value}} })
  }

  changeSavingConstitution(event){
    this.setState({c:{...this.state.c, savingThrows:{constitution:event.target.value}}})
  }

  changeSavingIntelligence(event){
    this.setState({c:{...this.state.c,savingThrows:{intelligence:event.target.value}}})
  }

  changeSavingWisdom(event){
    this.setState({c:{...this.state.c, savingThrows:{ wisdom:event.target.value}} })
  }

  changeSavingCharisma(event){
    this.setState({c:{...this.state.c, savingThrows:{charisma:event.target.value}}})
  }

  render() {
    console.log('character sheet state', this.state)
  return (
  <div className='col-md-12'>
    <h2> Character Sheet </h2>
    <h3>General</h3>
    <div className='row'>
      <div className='col-md-8'>
        <label className='control-label col-md-12'>Character Name</label>
        <div className='col-md-12'>
          <input type='text' value={this.state.c.characterName} onChange={this.changeName.bind(this)}/>
        </div>
      </div>
      <div className='col-md-4'>
        <label className='control-label'>Class</label>
        <div className='col-md-12'>
          <input type='text' value={this.state.c.class} onChange={this.changeClass.bind(this)}/>
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
        <label className='control-label col-md-12'>XP</label>
        <div className='col-md-12'>
          <input type='text' value={this.state.c.experiencePoints} onChange={this.changeXP.bind(this)}/>
        </div>
      </div>
      <div className='col-md-3'>
        <label className='control-label col-md-12'>Gold</label>
        <div className='col-md-12'>
          <input type='text' value={this.state.c.gold} onChange={this.changeGold.bind(this)}/>
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
        <textarea/>
      </div>
    </div>
    <this.renderButton/>
  </div>
  );
  }
}