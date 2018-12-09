/* eslint-disable */
import React, {Component} from 'react'

export class Stats extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <div className='row'>
      <div className='col-md-2'>
        <label className='control-label'> Strength </label>
        <div className='col-md-12'>
          <input type='number' value={this.props.state.strength}  onChange={this.props.strengthStat}/>
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label'> Dexterity </label>
        <div className='col-md-12'>
          <input type='number' value={this.props.state.dexterity}  onChange={this.props.dexterityStat}/>
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label'> Constitution </label>
        <div className='col-md-12'>
          <input type='number' value={this.props.state.constitution}  onChange={this.props.constitutionStat}/>
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Intelligence </label>
        <div className='col-md-12'>
          <input type='number' value={this.props.state.intelligence}  onChange={this.props.intelligenceStat}/>
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Wisdom </label>
        <div className='col-md-12'>
          <input type='number' value={this.props.state.wisdom}  onChange={this.props.wisdomStat}/>
        </div>
      </div>
      <div className='col-md-2'>
        <label className='control-label col-md-12'> Charisma </label>
        <div className='col-md-12'>
          <input type='number' value={this.props.state.charisma} onChange={this.props.charismaStat}/>
        </div>
      </div>
    </div>
    );
  }
}