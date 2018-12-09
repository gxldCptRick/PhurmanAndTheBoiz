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
      level: '1',
      inspiration: '1',
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
      description: "Description"      
    }

    };
  this.handleButtonPush = this.handleButtonPush.bind(this);
  this.renderButton = this.renderButton.bind(this);
}

componentWillMount(){
  console.log('will mount xd')
  this.setState({c:{...this.state.c, userId: this.props.uID}})
}

componentDidMount(){
  console.log('Did mount')
  if(this.props.rID !== ''){
    GetResource(Resource.Characters, this.props.rID)
    .then(Response => Response.json())
    .then(json => this.setState({c: json}))
  }
}

handleButtonPush(){
  if(this.state.c.characterId !== ''){
    PutToResource(Resource.Characters,this.state.c.characterId,this.state.c)
  }else{
    PostToResource(Resource.Characters,this.state.c);
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

  render() {
    console.log('state',this.state)
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