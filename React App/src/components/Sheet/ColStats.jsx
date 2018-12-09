/* eslint-disable */
import React, {Component} from 'react'

export class Stats extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <div>
        <label className='control-label col-md-12'> Strength </label>
        <input type='text' className='col-md-12' value={this.props.state.strength}  onChange={this.props.strengthStat}/>
        <label className='control-label col-md-12'> Dexterity </label>
        <input type='text' className='col-md-12' value={this.props.state.dexterity}  onChange={this.props.dexterityStat}/>
        <label className='control-label col-md-12'> Constitution </label>
        <input type='text' className='col-md-12' value={this.props.state.constitution}  onChange={this.props.constitutionStat}/>
        <label className='control-label col-md-12'> Intelligence </label>
        <input type='text' className='col-md-12' value={this.props.state.intelligence}  onChange={this.props.intelligenceStat}/>
        <label className='control-label col-md-12'> Wisdom </label>
        <input type='text' className='col-md-12' value={this.props.state.wisdom}  onChange={this.props.wisdomStat}/>
        <label className='control-label col-md-12'> Charisma </label>
        <input type='text' className='col-md-12' value={this.props.state.charisma} onChange={this.props.charismaStat}/>
      </div>
    );
  }
}