import React, { Component } from "react";
import { FormBtn, Input } from "../../components/Form/";
import { Col, Row, Container } from "../..components/Grid";
import { Link } from "react-router-dom";
import Jumbotron from "../..components/Jumbotron/Jumbotron";

handleInputChange = e => {
	const { name, value } = e.target;
	this.setState({
		[name]: value
	});
};


handleFormSubmit = e => {
	event.preventDefault();

if (this.state.voter_firstName && this.state.voter_lastName && this.state.voter_passphrase && this.state.voter_email) {
----->> Blah Blah Blah Save User information <<-----
	.then(res => this.Blah Blah Blah Render new page <<-----)
	.catch(err => console.log(err));
	}
};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size = "md-6">
					<Jumbotron>
					<h1>Please Enter Your Information</h1>
					</Jumbotron>
					<form>
						<Input
							value={this.state.voter_firstName}
								onChange={this.handleInputChange}
									name="voter_firstName"
									placeholder="First Name (Required)"
									/>
									</form>
					</Col>
				</Row>
			</Container>
			)
	}

	export default NewUser;
