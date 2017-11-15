import React, { Component } from 'react';
import Jumbotron from "../../components/Jumbotron/";


class LiskVote extends Component {
	state = {
		password: ""
	};
	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-12">
						<Jumbotron>
							<input onChange={ event =>
								this.setState({
									password: event.target.value
								})
							}
							/>
						</Jumbotron>
					</Col>
				</Row>
				</Container>
			);
	}
}

export default LiskVote;
