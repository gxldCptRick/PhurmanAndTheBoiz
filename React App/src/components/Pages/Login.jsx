import React, { Component } from 'react';
import { LoginUser } from '../../helpers/ApiService';

export class Login extends Component {
 constructor(props) {
  super(props);
  this.state={
    Password:'',
    Username:'',
  }
 }

 handlePasswordChange(event){
   this.setState({Password: event.target.value})
 }
 handleUserNameChange(event){
    this.setState({Username: event.target.value})
 }
 handleLoginAttempt(){
  LoginUser(this.state)
 }

 render() {
  return (
    <div className='form-horizontal'>
   <h2>Login</h2>
        <div className='row'>
          <div className='col-md-6'>
          <label> Username:
        <input onChange={this.handleUserNameChange.bind(this)}
          />
        </label>
          </div>
          <div className='col-md-6'>
        <label>Password:
        <input type="Password" onChange={this.handlePasswordChange.bind(this)}
          />
        </label>
          </div>
        </div>
        <input type='submit' value="Login" onClick={this.handleLoginAttempt.bind(this)}></input>
   </div>
  );
 }
}