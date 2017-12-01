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
            labels: [

            ],
            issue_nameArray: [],
            chart: {
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor : []
                }]
            },
            chartArr: []
        }
    }

    getChartData(issue) {
        console.log("Issue to go in chart: " + JSON.stringify(issue, null, 2));
        let labels = [];
        let values = [];
        let bgColors = [];

        const getRanColor = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;

        if (this.state.ballot.length) {
            // Loop through positions through request
            issue.Positions.forEach(position => {
                labels.push(position.position_name);
                values.push(position.position_tally * 10);
                bgColors.push(getRanColor());
            });

            let update = this.state.chart;
            console.log(JSON.stringify(update, null, 2));


            update.labels = labels;
            update.datasets[0].data = values;
            update.datasets[0].backgroundColor = bgColors;
            let chartArr = this.state.chartArr;
            chartArr.push(update);
            console.log(JSON.stringify(chartArr, null, 2));
            this.setState({
                chartArr: chartArr
            });
        }
    }


    loopIssues = (ballot) => {
        console.log(ballot);
        if (ballot) {
            let issue_nameArray = this.state.issue_nameArray;
            ballot.Issues.forEach(issue => {
                console.log(issue.issue_name);
                issue_nameArray.push(issue.issue_name);
                console.log('<namearray>' + JSON.stringify(issue_nameArray, null, 2) + '</namearray>');
                this.getChartData(issue);
            })
        }
    }

    loadBallot = () => {
        API.getBallot(this.props.match.params.ballot_id)
            .then( res => {
                this.setState({ballot: [res.data]});
                this.loopIssues(this.state.ballot[0])
            })
            .catch(err => console.log(err));
    };


    componentDidMount() {
        this.loadBallot();
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
            <p>{JSON.stringify(this.state.chart, null, 2)}</p>
            {this.state.chartArr.length ? (
                <div>
                    {this.state.chartArr.map(chart => (
                        <Doughnut key='datasets' data={chart.datasets}/>
                    ))}
                </div>
            ) : (
                <h1>No Results: {JSON.stringify(this.state.chartArr, null, 2)}</h1>
            )}
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
