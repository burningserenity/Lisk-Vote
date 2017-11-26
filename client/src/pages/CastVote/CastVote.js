import React, { Component } from 'react';
import { Panel, FormGroup, Radio } from 'react-bootstrap';
import axios from 'axios';
import API from "../../utils/API";
import BallotBtn from "../../components/BallotCards/BallotBtn";


class CastVote extends Component {
	constructor() {
		super();

		this.state = {
			issue_id: ""
		};
	}

handleChange(e) {
	let prop = e.target.id;
	let change = {};

	change [prop] = e.target.value;
	this.setState(change);
}


	handleFormSubmit = e => {
		e.preventDefault();
		if (this.state.issue_id) {
			console.log(this.state.issue_id);
			axios.get('/api/issues/${this.state.issue_id}').then(() => window.location.href = '/openvotes/:id');
		}
};

	loadBallot = () => {
		API.getBallot()
			.then( res => {
				console.log(res.data);
				this.setState({ ballots: res.data, ballot_name: "", ballot_active: "", ballot_expiration: ""})
			})
			.catch(err => console.log(err));
	};



render() {
	return(
  <Panel defaultExpanded header={this.state.ballot_name}>
    Some default panel content here.
    <FormGroup fill>
      <Radio name="radioGroup" onChange={this.handleChange.bind(this)} id="issue_id">Item 1</Radio>
      <Radio name="radioGroup" onChange={this.handleChange.bind(this)} id="issue_id">Item 2</Radio>
    	<Radio name="radioGroup" onChange={this.handleChange.bind(this)} id="issue_id">Item 3</Radio>
    </FormGroup>
    Some more panel content here.
  </Panel>

		);
	}
}

export default CastVote;
