import React from "react";

export const JumboBtn = props =>
  <button {...props} type="button" style={{ float: "right" }} className="btn btn-primary btn-lg">
    {props.children}
    Gain Entry
  </button>;
