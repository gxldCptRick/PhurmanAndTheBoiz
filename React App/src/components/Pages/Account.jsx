import React, { Component } from "react";
import { RegisterPage } from "./RegisterPage";
import { Login } from "./Login";
import { Route, Link } from "react-router-dom";

function LoginDisplay() {
  return (
    <div className="rightOfPage">
        <Login />
        <Link to="/Login/SignUp">Register</Link>      
    </div>
  );
}

function RegisterDisplay() {
  return (
    <div>
      <RegisterPage />
      <Link to="/Login/SignIn">Sign In</Link>
    </div>
  );
}

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    this.showPrompts = this.showPrompts.bind(this);
  }

  componentWillMount() {
    var thisuser = JSON.parse(localStorage.getItem("user"));
    if (thisuser === null) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ loggedIn: true });
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.setState({ loggedIn: false });
  }

  showPrompts() {
    if (this.state.loggedIn) {
      return (
        <div className="bod">
          <h1>Logout</h1>
          <button onClick={this.logout.bind(this)}>Log Out</button>
        </div>
      );
    } else {
      return (
        <div>
          <Route exact path="/Login/SignIn" component={LoginDisplay} />
          <Route exact path="/Login/SignUp" component={RegisterDisplay} />
        </div>
      );
    }
  }

  render() {
    return <this.showPrompts />;
  }
}
