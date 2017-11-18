import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid/";
import API from "../../utils/API";
import { BallotCards, BallotBtn } from "../../components/BallotCards/";


class OpenVotes extends Component {
/*		state = {
			ballots: [
			validVotes: "",
			title: "",
			description: ""
			]
		}
		*/

/*
	componentDidMount() {
		this.loadBallots();
	}
	*/

/*
	loadBallots = () => {
		API.getBallots()
			.then( res =>
				this.setState({data: res.data, validVotes:"", title:"", description:""})
				)
			.catch(err => console.log(err));
	};
*/

	render() {
		return (
			<Container fluid>
			<h1 style={{ fontSize: 72 }}>These are all the Open Ballots</h1>
				<Col size="md-12">
				<Row>
	{/*				<BallotCard /> */}
<Col size="md-4">
<div className="card bg-light mb-3">
  	<div className="card-header">I am a Ballot</div>
  		<div className="card-body">
   			 <h4 className="card-title">Light card title</h4>
    				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    				<BallotBtn />
  		</div>
</div>
</Col>
<Col size="md-4">
<div className="card bg-light mb-3">
  	<div className="card-header">I am a Ballot</div>
  		<div className="card-body">
   			 <h4 className="card-title">Light card title</h4>
    				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    				<BallotBtn />
  		</div>
</div>
</Col>
<Col size="md-4">
<div className="card bg-light mb-3">
  	<div className="card-header">I am a Ballot</div>
  		<div className="card-body">
   			 <h4 className="card-title">Light card title</h4>
    				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    				<BallotBtn />
  		</div>
</div>
</Col>

	</Row>
	<Row>
	<Col size="md-4">
<div className="card bg-light mb-3">
  	<div className="card-header">I am a Ballot</div>
  		<div className="card-body">
   			 <h4 className="card-title">Light card title</h4>
    				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    				<BallotBtn />
  		</div>
</div>
</Col>
<Col size="md-4">
<div className="card bg-light mb-3">
  	<div className="card-header">I am a Ballot</div>
  		<div className="card-body">
   			 <h4 className="card-title">Light card title</h4>
    				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    				<BallotBtn />
  		</div>
</div>
</Col>
<Col size="md-4">
<div className="card bg-light mb-3">
  	<div className="card-header">I am a Ballot</div>
  		<div className="card-body">
   			 <h4 className="card-title">Light card title</h4>
    				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    				<BallotBtn />
  		</div>
</div>
</Col>
	</Row>
	<Row>
	<Col size="md-4">
<div className="card bg-light mb-3">
  	<div className="card-header">I am a Ballot</div>
  		<div className="card-body">
   			 <h4 className="card-title">Light card title</h4>
    				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    				<BallotBtn />
  		</div>
</div>
</Col>
<Col size="md-4">
<div className="card bg-light mb-3">
  	<div className="card-header">I am a Ballot</div>
  		<div className="card-body">
   			 <h4 className="card-title">Light card title</h4>
    				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    				<BallotBtn />
  		</div>
</div>
</Col>
<Col size="md-4">
<div className="card bg-light mb-3">
  	<div className="card-header">I am a Ballot</div>
  		<div className="card-body">
   			 <h4 className="card-title">Light card title</h4>
    				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    				<BallotBtn />
  		</div>
</div>
</Col>
	</Row>
</Col>
			</Container>
			);
	}
}

export default OpenVotes;
