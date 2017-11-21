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
      <Nav>
        <NavItem eventKey={1} href="#">Link</NavItem>
        <NavItem eventKey={2} href="#">Link</NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
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
