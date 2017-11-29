import React from "react";

const BallotBtn = props =>
  <button style={{ float: "right" }} className="btn btn-success" onClick={props.handleFormSubmit}>
    {props.children}
    Vote
  </button>;

export default BallotBtn;
