import React, { Component } from 'react';
import openSocket from 'socket.io-client'

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
    if (this.state.Password != this.state.p2) {
      alert("Passwords are not the same")
    } else {
      var user = {
        firstName: this.state.FirstName,
        lastName: this.state.LastName,
        userName: this.state.Username,
        password: this.state.Password,
      };
      alert(JSON.stringify(user));
      fetch('api/dnd/user',{
          method:'POST',
          body: JSON.stringify({user}),
            headers:{
              'Content-Type': 'application/json'
            },
      }).then(Response => console.log(Response))
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
<form>
        <label> First Name:
          <input
            value={this.state.FirstName}
            onChange={this.handleFirstNameChange}
          />
        </label>
        <br />
        <label> Last Name:
        <input
            value={this.state.LastName}
            onChange={this.handleLastNameChange}
          />
        </label>
        <br />
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
        <input type='button' value="Submit" onClick={this.handleSubmit} />
        </form>
    );
  }
}
