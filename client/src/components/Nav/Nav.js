import React from "react";


// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Nav = props =>
<div>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/" className="navbar-brand">
          LiskApp
        </a>
      </div>
    </div>
  </nav>
  </div>;

export default Nav;
