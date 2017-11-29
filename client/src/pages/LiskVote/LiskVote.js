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

            axios.get(`/api/voters?passphrase=${this.state.voter_passphrase}`).then(res => window.location.href = `/registeredvotes/${res.data.id}`)
          }
    };

	render() {

		return (
			<Container fluid>
				<Row>
					<Col size="md-12">
						<Jumbotron>
							<h1 style={styles.jumbotron.h1}>LivBold</h1>
							<Row>
							<Col size="md-6 centered">
							<Input onChange={this.handleChange.bind(this)} id="voter_passphrase"
							placeholder="Enter Passphrase" />
							<JumboBtn onClick={this.handleFormSubmit.bind(this)}/>
							</Col>
							</Row>
							<Row>
							<Col size="md-6 centered">
							<h4>Welcome to LivBold!</h4>
							<p>If you have not signed up, please create a user account to gain access.</p>
							<a href="#" className="btn btn-sm btn-secondary mr-3">
							Contact Us</a>
							<a href="#" className="btn btn-sm btn-secondary">FAQ </a>
							</Col>
							</Row>
						</Jumbotron>

						</Col>
				</Row>
			</Container>

		);
	}
}

const styles = {
	jumbotron: {
		h1: {
			marginBottom: '35px'
		}
	}
}

export default LiskVote;
