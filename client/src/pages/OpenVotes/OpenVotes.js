import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid/";
import API from "../../utils/API";
import { BallotCards, BallotBtn } from "../../components/BallotCards/";
import "./OpenVotes.css";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import  { Link } from 'react-router-dom';



class OpenVotes extends Component {
		state = {
			ballots: [],
			ballot_name: "",
			ballot_active: "",
			ballot_expiration: ""
		};

	componentDidMount() {
		this.loadBallots();
	}

	loadBallots = () => {
		API.getBallots()
			.then( res =>
				this.setState({ ballots: res.data, ballot_name:"", ballot_active:"", ballot_expiration:"" })
				)
			.catch(err => console.log(err));
	};


	render() {
		return (
			<Container>
      <Row>
<Col size="md-12">
              <h1>Ballots</h1>
            {this.state.ballots.length ? (
              <ListGroup>
                {this.state.ballots.map(ballot => (
                  <ListGroupItem key={ballot.id}>
                    <Link to={"/openvotes/" + ballot.id}>
                      <strong>
                        {ballot.ballot_name} Expires {ballot.ballot_expiration}
                      </strong>
                    </Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
			</Container>
			);
	}
}

export default OpenVotes;
