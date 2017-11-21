import React, { Component } from "react";
import { FormBtn, Input } from "../../components/Form/";
import { Col, Row, Container } from "../../components/Grid/";
import { Link } from "react-router-dom";
import { Jumbotron } from "../../components/Jumbotron";
import axios from "axios";

class NewUser extends Component {
	constructor() {
		super();

		this.state = {
			voter_firstName: "",
			voter_lastName: "",
			voter_email: "",
			voter_passphrase: ""
		};
	}

	handleChange(e) {
		let prop = e.target.id;
		let change = {};

		change[prop] = e.target.value;
		this.setState(change);
	}

handleInputChange = e => {
	const { name, value } = e.target;
	this.setState({
		[name]: value
	});
};

handleFormSubmit = e => {
 	e.preventDefault();

 if (this.state.voter_firstName && this.state.voter_lastName && this.state.voter_passphrase && this.state.voter_email) {
     let submitArr = [this.state.voter_firstName, this.state.voter_lastName, this.state.voter_passphrase, this.state.voter_email];
     axios.post('/api/voters', {voter_firstName: submitArr[0], voter_lastName: submitArr[1], voter_passphrase: submitArr[2], voter_email: submitArr[2]}).then(res => res.redirect('/openvotes'))
 	   .catch(err => console.log(err));
 	}
};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size = "md-12">
						<Jumbotron>
							<h1>Please Enter Your Information</h1>
						</Jumbotron>
					<Col size = "md-8">
						<form>
							<Input
								value={this.state.voter_firstName}
								onChange={this.handleInputChange.bind(this)}
								id="voter_firstName"
								name="voter_firstName"
								placeholder="First Name (Required)"
								/>
								<Input
								value={this.state.voter_lastName}
								onChange={this.handleInputChange.bind(this)}
								id="voter_lastName"
								name="voter_lastName"
								placeholder="Last Name (Required)"
								/>
								<Input
								value={this.state.voter_email}
								onChange={this.handleInputChange.bind(this)}
								id="voter_email"
								name="voter_email"
								placeholder="Email (Required)"
								/>
								<Input
								value={this.state.voter_passphrase}
								onChange={this.handleInputChange.bind(this)}
								id="voter_passphrase"
								name="voter_passphrase"
								placeholder="Passphrase (Required)"
								/>
								<FormBtn />
						</form>
					</Col>
					</Col>
				</Row>
			</Container>
			);
	}
}

	export default NewUser;
