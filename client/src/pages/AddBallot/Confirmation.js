import React, { Component } from "react";
import Moment from 'moment';

class Confirmation extends Component {
  
  render() {
    return (
      <div>
        <h2>Confirm Ballot Registration</h2>
        <ul>
          <li><b>Ballot Topic:</b> {this.props.fieldValues.ballot_name}</li>
          <li><b>Ballot Start:</b> {Moment(this.props.fieldValues.ballot_start).format('YYYY-MM-DD')}</li>
          <li><b>Ballot Expiration:</b> {Moment(this.props.fieldValues.ballot_expiration).format('YYYY-MM-DD')}</li>
          <li><b>Question:</b> {this.props.fieldValues.issue_name}</li>
          <li><b>Options:</b> {this.props.fieldValues.options.join(', ')}</li>
        </ul>
        <ul className="form-fields">
          <li className="form-footer">
            <button className="btn -default pull-left" onClick={this.props.previousStep}>Back</button>
            <button className="btn -primary pull-right" onClick={this.props.submitRegistration}>Submit Registration</button>
          </li>
        </ul>
      </div>
    )
  }
};

export default Confirmation;