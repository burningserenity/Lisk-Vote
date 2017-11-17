import React from "react";

export const BallotBtn = props =>
  <button {...props} style={{ float: "right" }} className="btn btn-success">
    {props.children}
    Vote
  </button>;
