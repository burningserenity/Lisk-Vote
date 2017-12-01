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
    <Navbar inverse style={styles.navBar}>
    <LinkContainer to="/">
      <Navbar.Brand>
        LivBold
      </Navbar.Brand>
      </LinkContainer>
  </Navbar>
    );
  }
}

const styles = {
  navBar: {
    backgroundColor: 'rgba(30, 30, 30, .95)'
  }
}

export default NavBar;
