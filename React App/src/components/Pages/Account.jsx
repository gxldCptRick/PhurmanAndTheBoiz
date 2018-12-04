import React, {Component} from 'react'
import {RegisterPage} from './RegisterPage'
import {Login} from './Login'

export class Account extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return(
    <div>
      <div className='row'>
        <div className='col-md-6'>
          <RegisterPage/>
        </div>
        <div className='col-md-6'>
          <Login/>
        </div>
      </div>
    </div>
    );
  }
}