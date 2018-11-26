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
            <Link to={"/"}>PhurmanAndTheBoiz.API</Link>
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
            <LinkContainer to={"/RegisterPage"}>
              <NavItem>
                <Glyphicon glyph="bookmark" /> Register
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/characters"}>
              <NavItem>
                <Glyphicon glyph="file" />
                Characters
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/Items"}>
              <NavItem>
                <Glyphicon glyph="shopping-cart" /> Items
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/Game"}>
              <NavItem>
                <Glyphicon glyph="heart" /> Game
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/RollDice"}>
              <NavItem>
                <Glyphicon glyph="th-list" /> Roll a dice
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/CharacterSheet"}>
              <NavItem>
                <Glyphicon glyph="th-list" /> Aww Sheet
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
