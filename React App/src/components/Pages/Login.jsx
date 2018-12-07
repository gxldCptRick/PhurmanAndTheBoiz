import React, { Component } from 'react';
import { LoginUser } from '../../helpers/ApiService';
import { Redirect } from "react-router";

export class Login extends Component {
 constructor(props) {
  super(props);
  this.state={
    Password:'',
    Username:'',
    toNavigate: false,
  }
 }

 handlePasswordChange(event){
   this.setState({Password: event.target.value})
 }
 handleUserNameChange(event){
    this.setState({Username: event.target.value})
 }
 handleLoginAttempt(){
   var creds={
     Username: this.state.Username,
     Password: this.state.Password,
   }
  LoginUser(creds)
  .then(response => this.setState({toNavigate: true}))
 }

 render() {
   if(this.state.toNavigate){
    return <Redirect to={'/Profile'}/>
   }else{
     return(
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
     )}
 }
}