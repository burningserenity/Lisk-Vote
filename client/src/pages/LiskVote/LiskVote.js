import React, { Component } from 'react';
import { Input, Jumbotron, JumboBtn } from "../../components/Jumbotron/";
import { Link } from 'react-router-dom';
import { Col, Row, Container } from "../../components/Grid/";
import axios from 'axios';
import "./LiskVote.css"

class LiskVote extends Component {
	constructor() {
		super();

		this.state = {
			voter_passphrase: ""
		};
	}

	handleChange(e) {
		let prop = e.target.id;
		let change = {};

		change[prop] = e.target.value;
		this.setState(change);
	}

    handleFormSubmit = e => {
        e.preventDefault();
        if (this.state.voter_passphrase) {
            console.log(this.state.voter_passphrase);
            axios.get(`/api/voters?passphrase=${this.state.voter_passphrase}`).then(res => window.location.href = `/openvotes/${res.data.id}`)
                                                                   .catch(err => console.log(err));
        }
    };

	render() {

		return (
			<Container fluid>
				<Row>
					<Col size="md-12">
						<Jumbotron>
							<h1>LivBold</h1>
							<Input onChange={this.handleChange.bind(this)} id="voter_passphrase" />
							<JumboBtn onClick={this.handleFormSubmit.bind(this)}/>

						</Jumbotron>

						</Col>
				</Row>
			</Container>

		);
	}
}

export default LiskVote;
