import React, { Component } from 'react';

export class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      FirstName: 'first',
      LastName: 'last',
      Username: 'user',
      Password: 'pass',
      p2: 'pass',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);

  }
  handleSubmit(event) {
    if (this.state.Password !== this.state.p2) {
      alert("Passwords are not the same")
    } else {
      var user={
        firstName: this.state.FirstName,
        lastName: this.state.LastName,
        userName: this.state.Username,
        password: this.state.Password
      }
      fetch("http://localhost:56453/api/dnd/user",{
        method: 'POST',
        mode: 'no-cors',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      .then(response => alert(JSON.stringify(response)))
      .catch(err => console.log(err))
    }
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
        <h1>Register for the Dungeon</h1>
          <div className='row'>
            <div className='col-md-4'>
              <label className='control-label col-md-12'>Username</label>  
              <div className='col-md-12'>
                  <input value={this.state.Username} onChange={this.handleUserNameChange}/>
              </div>
            </div>
            <div className='col-md-4'>
              <label className='control-label col-md-12'>First Name</label>
              <div className='col-md-12'>
                <input type='text' value={this.state.FirstName} onChange={this.handleFirstNameChange}/>
              </div>
            </div>
            <div className='col-md-4'>
              <label className='control-label col-md-12'> Last Name</label>
              <div className='col-md-12'>
                <input type='text' value={this.state.LastName} onChange={this.handleLastNameChange}/>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <label className='control-label col-md-12'>Password</label>  
              <div className='col-md-12'>
                <input type="Password" value={this.state.Password} onChange={this.handlePasswordChange}/>
              </div>
            </div>
            <div className='col-md-6'>
              <label className='control-label col-md-12'>Confirm Password</label>  
              <div className='col-md-6'>
                <input type="Password" value={this.state.p2} onChange={this.handleConfirmPassword}/>    
              </div>
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
