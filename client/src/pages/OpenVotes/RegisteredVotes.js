import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid/";
import API from "../../utils/API";
import "./OpenVotes.css";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import  { Link } from 'react-router-dom';

//Should look the same as openvotes

class RegisteredVotes extends Component {
		state = {
			ballots: [],
		};

	componentDidMount() {
		this.loadBallots();
	}

	loadBallots() {
		API.getRegisteredBallots(this.props.match.params.voter)
			.then( res => {
                let activeBallots = [];
                let inactiveBallots = [];
                /*let registeredBallots = [];*/
                res.data.forEach(element => {
                    element.ballot_active ? activeBallots.push(element) : inactiveBallots.push(element)
                    console.log(`Active ballots: \n ${JSON.stringify(activeBallots, null, 2)}`);
                });
				this.setState({ ballots: activeBallots })
			})
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
                    <Link to={"/registeredvotes/" + ballot.id + "/" + this.props.match.params.voter}>
                      <strong>
                        Ballot Name/Topic: {ballot.ballot_name} <br/> Ballot Expires: {ballot.ballot_expiration}
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

export default RegisteredVotes;
