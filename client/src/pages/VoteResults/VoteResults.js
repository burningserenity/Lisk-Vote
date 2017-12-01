import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid/";
import { Tabs, Tab } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import"./VoteResults.css";
import API from "../../utils/API";


class VoteResults extends Component {
  constructor() {
    super();
 this.state = {
  ballot:[],
    lables: [

    ],
    issue_nameArray: [],

    datasets: [{
      data: [],
      backgroundColor: [

      ],
      hoverBackgroundColor : [

      ]
    }]
  }
}

getChartData(issue) {
    let labels = [];
    let values = [];
    let bgColors = [];

    const getRanColor = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;

  if (this.state.ballot.length > 0) {
    // Loop through positions through request
    issue.Positions.forEach(position => {
      labels.push(position.position_name);
      values.push(position.position_tally * 10);
      bgColors.push(getRanColor());
    });

    let update = this.state.chart;

    update.labels = labels;
    update.datasets[0].data = values;
    update.datasets[0].backgroundColor = bgColors;

    this.setState({
     chart: update
    });
  }
}


loopIssues = (ballot) => {
  if (this.state.ballot.length > 0) {
  let issue_nameArray = this.state.issue_nameArray;
    ballot[0].Issues.forEach(issue => {
      issue.issue_name.push(issue_nameArray);
      this.getChartData(issue);
    })
    }
}

   loadBallot = () => {
        API.getBallot(this.props.match.params.id)
            .then( res => {
                this.setState({ballot: [res.data]});
            })
            .catch(err => console.log(err));
    };

  componentWillMount() {
    this.loadBallot();
  }

  componentDidMount() {
    this.getChartData();
  }

render() {
	return(
		<Container>
			<Row>
				<Col size="md-12">

 <div className="row justify-content-center">

<div className="card text-center" style={styles.card}>
  <div className="card-header" style={styles.header}>
    Vote Results
  </div>

<Doughnut data={this.state}/>

  <div className="card-body">

    <h4 className="card-title">Here are the Results for the Ballot you selected</h4>
    <p className="card-text">All voters are kept annonymous to ensure validity of votes.</p>


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


const styles = {
  card: {
    backgroundColor: 'rgba(30, 30, 30, .65)'
  },
  header: {
    backgroundColor: 'rgba(30, 30, 30, .85)'
  }
}



export default VoteResults;
