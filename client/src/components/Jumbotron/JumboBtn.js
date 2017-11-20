import React from "react";
import { Link } from 'react-router-dom';

export const JumboBtn = props =>
<div>
  <button {...props} type="button" style={{ float: "right" }} className="btn btn-primary btn-lg">
    {props.children}
    Gain Entry
  </button>

  <Link className="btn btn-success" to="/newuser" style={{ color: "white",
                                                        padding: "8px"}}>
  New User
  </Link>
  </div>;
