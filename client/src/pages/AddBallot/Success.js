import React, { Component } from "react";
import axios from 'axios';

class Success extends Component {

componentDidMount() {
        this.SubmitRegistration();
 };

    SubmitRegistration = () => {
    console.log("Me llamaron");
    console.log(this.props.fieldValues);
    if (this.props.fieldValues) {
        console.log(this.props.fieldValues);
         axios({
            method: 'post',
            url: `/api/ballots/register/`,
            data: {
                ballot_name: this.props.fieldValues.ballot_name,
                ballot_start: this.props.fieldValues.ballot_start.format("mm:dd:yyyy hh:mm:ss"),
                ballot_expiration: this.props.fieldValues.ballot_start.format("mm:dd:yyyy hh:mm:ss"),
                issue_name: this.props.fieldValues.issue_name,
                options: this.props.fieldValues.options
            }
        }).then(() => {
            this.nextStep();
        });
     }
    };

  render() {
    return (
      <div>
        <h2>Successfully Registered!</h2>
         <b>{this.props.fieldValues.ballot_name}</b>
         <b>{this.props.fieldValues.ballot_start.format('MM/DD/YYYY')}</b>
         <b>{this.props.fieldValues.ballot_expiration.format('MM/DD/YYYY')}</b>
         <b>{this.props.fieldValues.issue_name}</b>
         <b>{this.props.fieldValues.options[0]}</b>
         <b>{this.props.fieldValues.options[1]}</b>
      </div>
    )
  }
};

export default Success;