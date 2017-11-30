import React from "react";

export const FormBtn = props =>
  <button {...props} style={{ float: "right" }} className="btn btn-outline-success btn-lg">
    {props.children}
    Submit
  </button>;
