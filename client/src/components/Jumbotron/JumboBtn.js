import React from "react";
import { Link } from 'react-router-dom';

export const JumboBtn = props =>
<div>
  <button {...props} type="button" style={{ float: "right" }} className="btn btn-primary btn-lg">
    {props.children}
    Gain Entry
  </button>

  <button {...props} style={{ float: "left" }} className="btn btn-warning btn-lg">
  <Link to="/newuser" style={{ color: "white" }}>
  New User
  </Link>
  </button>
  </div>;
