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
      toNavigate: false,
      loginFailed: false
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
      username: this.state.Username,
      password: this.state.Password
    };
    LoginUser(creds)
    .then(response => {
      if(response.status === 200){
        return response.json();
      }else{
        throw new Error("Login Failed")
      }
    })
      .then(json => localStorage.setItem("user", JSON.stringify(json)))
      .then(_ => this.setState({toNavigate: true, loginFailed: false }))
      .catch(err => this.setState({error: err, loginFailed: true}));
  }

  renderFail(){
    if(this.state.loginFailed){
      return (<ul>
        {Object.keys(this.state.error).map(e => <li key={e}>{this.state.error[e]}</li>)}
      </ul>)
    }
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
                {this.renderFail()}
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
