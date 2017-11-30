import React, { Component } from "react";
import "./Nav.css";
import { Navbar, Nav, MenuItem, NavDropdown, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


class NavBar extends Component {
  handleClick = e => {
    e.preventDefault();
    console.log('The link was clicked');
  };

  render() {
    return(
    <Navbar inverse>
    <LinkContainer to="/">
      <Navbar.Brand>
        LivBold
      </Navbar.Brand>
      </LinkContainer>
  </Navbar>
    );
  }
}

export default NavBar;
