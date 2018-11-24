import React, { Component } from 'react';

export class Login extends Component {
 constructor(props) {
  super(props);
  this.state={
    Username:'',
    Password:'',
  }
  this.handleLoginAttempt= this.handleLoginAttempt.bind(this);
  this.handlePasswordChange = this.handlePasswordChange.bind(this);
  this.handleUserNameChange = this.handlePasswordChange.bind(this);
 }

 handlePasswordChange(event){
   this.setState({Username: event.target.value})
 }
 handleUserNameChange(event){
    this.setState({Password: event.target.value})
 }
 handleLoginAttempt(event){
  alert(JSON.stringify(this.state))
  console.log(JSON.stringify(this.state))
 }

 render() {
  return (
    <div className='form-horizontal'>
   <h2>Login</h2>
        <div className='row'>
          <div className='col-md-6'>
          <label> Username:
        <input
            value={this.state.Username}
            onChange={this.handleUserNameChange}
          />
        </label>
          </div>
          <div className='col-md-6'>
        <label>Password:
        <input
            type="Password"
            value={this.state.Password}
            onChange={this.handlePasswordChange}
          />
        </label>
          </div>
        </div>
        <input type='submit' value="Login" onClick={this.handleLoginAttempt}></input>
   </div>
  );
 }
}