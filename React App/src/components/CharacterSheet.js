import React, {Component} from 'react';

export class CharacterSheet extends Component{
  constructor(props){
    this.state = {
      // character information goes here
      Name:'',
    }
  }

  render(){
    return(
      <h2>Character Sheet</h2>
    );
  }
}