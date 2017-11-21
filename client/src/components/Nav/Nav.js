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
    <Navbar inverse collapseOnSelect>
    <Navbar.Header>
    <LinkContainer to="/">
      <Navbar.Brand>
        LivBold
      </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>

      <Nav pullRight>
<LinkContainer to="/newuser">
        <NavItem eventKey={1} href="#">New User</NavItem>
        </LinkContainer>
     </Nav>
    </Navbar.Collapse>
  </Navbar>
    );
  }
}

export default NavBar;
