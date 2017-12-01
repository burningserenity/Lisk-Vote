import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid/";
import { Tabs, Tab } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import"./VoteResults.css";


class VoteResults extends Component {
  constructor() {
    super();
 this.state = {
    lables: [
    'Red',
    'Green',
    'Yellow'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor : [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]
  }
}


render() {
	return(
		<Container>
			<Row>
				<Col size="md-12">

 <div className="row justify-content-center">

<div className="card text-center">
  <div className="card-header">
    Vote Results
  </div>

<Doughnut data={this.state}/>

  <div className="card-body">
  <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
    <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
    <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
    <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
  </Tabs>
    <h4 className="card-title">Here are the Results for the Ballot you selected</h4>
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
