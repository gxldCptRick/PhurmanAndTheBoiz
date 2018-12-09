import React, { Component } from 'react';
import { LoginUser } from '../../helpers/ApiService';
import { Redirect } from "react-router";

export class Login extends Component {
 constructor(props) {
  super(props);
  this.state={
    Password:'',
    error: {},
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

 handleResponse(){
  return (response) => {
    console.log(response);
    if(response.status === 400){
      response.json().then(json => {
        this.setState({error: json, toNavigate: false});
      })
    }else {
      this.setState({toNavigate: true})
      return response.json();
    }
  }
 }

 handleLoginAttempt(){
   var creds={
     Username: this.state.Username,
     Password: this.state.Password,
   }
  LoginUser(creds)
  .then(this.handleResponse())
  .catch(err => console.log(err));
 }

 render() {
   if(this.state.toNavigate){
    return <Redirect to={'/Profile'}/>
   }else{
     return(
       <div className='bod'>
       <h1>Login</h1>
       {
         Object.keys(this.state.error).map(e => <p className="error" key={e}>{this.state.error[e]}</p>)
       }
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