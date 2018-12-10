import React, { Component } from "react";
import { RegisterPage } from "./RegisterPage";
import { Login } from "./Login";
import { Route, Link } from "react-router-dom";

function LoginDisplay() {
  return (
    <div>
      <Login />
      <div className="rightOfPage">
        <p className="Ptag">
          If you are new to our website please click this button to make an
          account for our page. By doing this you will be able to save all you
          progress from this point forward.
        </p>
        <form action="/Login/SignUp">
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}

function RegisterDisplay() {
  return (
    <div>
      <RegisterPage />
      <div className="rightOfPage">
        <p className="Ptag">
          If you have an account with us please click this link to be taken to
          the login page where you can acces all of your items attached to your
          account.
        </p>
        <form action="/Login/SignIn">
          <input type="submit" value="Sign up" />
        </form>
      </div>
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
