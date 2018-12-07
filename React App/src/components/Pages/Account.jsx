import React, {Component} from 'react'
import {RegisterPage} from './RegisterPage'
import {Login} from './Login'

export class Account extends Component{
  constructor(props){
    super(props);
    this.state={
      loggedIn: false,
    };

    this.showPrompts = this.showPrompts.bind(this);
  }

  componentWillMount(){
    var thisuser = JSON.parse(localStorage.getItem("user"));
    if(thisuser === null){
      this.setState({loggedIn: false})
    }else{
      this.setState({loggedIn: true})
    }
  }

  showPrompts(){
    if(this.state.loggedIn){
      return(
        <div>
          <RegisterPage/>
          <button onClick={()=> {localStorage.removeItem("user"); this.setState({loggedIn: false})}}>Log Out</button>
        </div>
      )
    }else{
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
      )
    }
  }

  render(){
    return(
      <this.showPrompts/>
    );
  }
}