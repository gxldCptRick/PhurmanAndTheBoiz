import React, { Component } from "react";
import { LoginUser } from "../../helpers/ApiService";
import { Redirect } from "react-router";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Password: "",
      error: {},
      Username: "",
      toNavigate: false
    };
  }

 handlePasswordChange(event){
   this.setState({Password: event.target.value})
 }
 handleUserNameChange(event){
    this.setState({Username: event.target.value})
 }
  handleLoginAttempt() {
    var creds = {
      Username: this.state.Username,
      Password: this.state.Password
    };
    LoginUser(creds)
      .then(this.handleResponse())
      .then(json => localStorage.setItem("user", JSON.stringify(json)))
      .then( ()=>{
        if(localStorage.getItem("user") !== null){
          this.setState({toNavigate: true})
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.toNavigate) {
      return <Redirect to={"/Profile"} />;
    } else {
      return (
        <div className="bod">
          <h1>Login</h1>

          <div className="leftOfPage">
            <div className="smallTweak">
              <p className='Ptag'>
                If you have been to our page before feel free to sign into your
                account here
              </p>
            </div>
            <div className="loginBox">
              <div className="row">
                <div className="col-md-6">
                  <label>
                    Username:
                    <input onChange={this.handleUserNameChange.bind(this)} />
                  </label>
                </div>
                <div className="col-md-7">
                  <label>
                    Password:
                    <input
                      type="Password"
                      onChange={this.handlePasswordChange.bind(this)}
                    />
                  </label>
                  <div className="smallButton">
                    <input
                      type="submit"
                      value="Login"
                      onClick={this.handleLoginAttempt.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
