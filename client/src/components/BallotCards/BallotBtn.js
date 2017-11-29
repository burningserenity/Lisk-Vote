import React from "react";

const BallotBtn = props =>
  <button {...props} style={{ float: "right" }} className="btn btn-success">
    {props.children}
    Vote
  </button>;

export default BallotBtn;
