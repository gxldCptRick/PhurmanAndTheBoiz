import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Glyphicon, Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavMenu.css";
function GetStatus(){
  if(localStorage.getItem("user")) return "Logout";
  return "Login";
}
export class NavMenu extends Component {
  displayName = NavMenu.name;

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={"/"}>PhurmanAndTheBoiz</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={"/"} exact>
              <NavItem>
                <Glyphicon glyph="home" /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/Login/SignIn"}>
              <NavItem>
                <Glyphicon glyph="bookmark" /> {GetStatus()}
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/Game"}>
              <NavItem>
                <Glyphicon glyph="heart" />
                Game
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/Profile"}>
              <NavItem>
                <Glyphicon glyph="user" />
                Profile Page
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
