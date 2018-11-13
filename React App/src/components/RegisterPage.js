import React, { Component } from 'react';

export class RegisterPage extends React.Component {

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
    if (this.state.Password != this.state.p2) {
      alert("Passwords are not the same")
    } else {
      console.log(this.state)
      alert(JSON.stringify(this.state))
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
<div className='form-horizontal'>
      <div className='row'>
        <div className='col-md-6'>
        <label> First Name:
          <input
            value={this.state.FirstName}
            onChange={this.handleFirstNameChange}
          />
        </label>

        </div>
        <div className='col-md-6'>
        <label> Last Name:
        <input
            value={this.state.LastName}
            onChange={this.handleLastNameChange}
          />
        </label>
        </div>
      </div>
        <label> Username:
        <input
            value={this.state.Username}
            onChange={this.handleUserNameChange}
          />
        </label>
        <br />
        <label>Password:
        <input
            type="Password"
            value={this.state.Password}
            onChange={this.handlePasswordChange}
          />
        </label>
        <br />
        <label>Confirm Password
        <input
            type="Password"
            value={this.state.p2}
            onChange={this.handleConfirmPassword}
          />
        </label>
        <br />
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </div>
    );
  }
}
