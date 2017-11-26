import React, { Component } from 'react';
import { Panel, FormGroup, Radio } from 'react-bootstrap';
import axios from 'axios';


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
			axios.get('/api/ballots/${this.state.issue_id}').then(() => window.location.href = '/openvotes/:id');
		}
};

render() {
	return(
  <Panel defaultExpanded header="Panel heading">
    Some default panel content here.
    <FormGroup fill>
      <Radio name="radioGroup" onChange={this.handleChange.bind(this)} id="issue_id">Item 1</Radio>
      <Radio name="radioGroup">Item 2</Radio>
      <Radio name="radioGroup">&hellip;</Radio>
    </FormGroup>
    Some more panel content here.
  </Panel>

		);
	}
}

export default CastVote;
