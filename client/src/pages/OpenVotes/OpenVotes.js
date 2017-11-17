import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid/";
import API from "../../utils/API";
import { BallotBtn, BallotCard } from "../../components/BallotCards/";


class OpenVotes extends Component {
		state = {
			ballots: [
			validVotes: "",
			title: "",
			description: ""
			]
		}


	componentDidMount() {
		this.loadBallots();
	}

	loadBallots = () => {
		API.getBallots()
			.then( res =>
				this.setState({data: res.data, validVotes:"", title:"", description:""})
				)
			.catch(err => console.log(err));
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<BallotCard />
				</Row>
			</Container>
			)
	}
}

export default OpenVotes;
