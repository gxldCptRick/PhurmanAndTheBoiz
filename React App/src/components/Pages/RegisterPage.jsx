import React, { Component } from 'react';
import { Redirect } from "react-router";
import { RegisterUser } from '../../helpers/ApiService';

export class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      Username: '',
      Password: '',
      p2: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);

  }
  handleSubmit(event) {
    var user={
      firstName: this.state.FirstName,
      lastName: this.state.LastName,
      userName: this.state.Username,
      password: this.state.Password

    }
    RegisterUser(user)
    .then(response => {return <Redirect to={'/Profile'}/>})
  }

  handleFirstNameChange(event) {
    this.setState({ FirstName: event.target.value })
  }
  handleLastNameChange(event) {
    this.setState({ LastName: event.target.value })
  }
  handleUserNameChange(event) {
    this.setState({ Username: event.target.value })
  }
  handlePasswordChange(event) {
    this.setState({ Password: event.target.value })
  }
  handleConfirmPassword(event) {
    this.setState({ p2: event.target.value })
  }
  render() {
    return (
      <div>
        <h1>Register for DungeonRollers</h1>
          <div className='row'>
            <div className='col-md-4'>
              <label className='control-label col-md-12'>Username</label>  
              <input className='col-md-12' value={this.state.Username} onChange={this.handleUserNameChange} pattern=".{1,55}" required title='Must be between 1 and 55 characters long'/>
            </div>
            <div className='col-md-4'>
              <label className='control-label col-md-12'>First Name</label>
              <input className='col-md-12' type='text' value={this.state.FirstName} onChange={this.handleFirstNameChange} pattern=".{2,55}" required title='Must be between 2 and 55 characters long'/>
            </div>
            <div className='col-md-4'>
              <label className='control-label col-md-12'> Last Name </label>
              <input className='col-md-12' type='text' value={this.state.LastName} onChange={this.handleLastNameChange} pattern=".{2,55}" required title='Must be between 2 and 55 characters long'/>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <label className='control-label col-md-12'>Password</label>  
              <input className='col-md-12' type="Password" value={this.state.Password} onChange={this.handlePasswordChange} pattern=".{8,55}" required title='Must be between 8 and 55 characters long'/>
            </div>
            <div className='col-md-6'>
              <label className='control-label col-md-12'>Confirm Password</label>  
              <input className='col-md-12' type="Password" value={this.state.p2} onChange={this.handleConfirmPassword}/>    
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
            <br/>
              <input type='submit' value="Submit" onClick={this.handleSubmit} />
            </div>
          </div>
      </div>
    );
  }
}
