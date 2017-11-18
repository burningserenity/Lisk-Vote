import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid/";


class VoteResults extends Component {

render() {
	return(
		<Container fluid>
			<Row>
				<Col size="md-12">

 <div className="row justify-content-center">

<div className="card text-center">
  <div className="card-header">
    Vote Results
  </div>
  <div className="card-body">
    <h4 clasName="card-title">Here are the Results for the Ballot you selected</h4>
    <p className="card-text">All voters are kept annonymous to ensure validity of votes.</p>

  							<li>Hashed User 1</li>
  							<li>Hashed User 2</li>
  							<li>Hashed User 3</li>
  							<li>Hashed User 4</li>
  							<li>Hashed User 5</li>
  							<li>Hashed User 6</li>


  </div>
  <div className="card-footer text-muted">
    Days left to vote: 2
  </div>
</div>

    </div>
				</Col>
			</Row>
		</Container>
		);
	}
}

export default VoteResults;
