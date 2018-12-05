import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Glyphicon, Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavMenu.css";

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
            <LinkContainer to={"/Account"}>
              <NavItem>
                <Glyphicon glyph="bookmark" /> Account
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
