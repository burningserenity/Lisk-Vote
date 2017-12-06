import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid/";
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
            chartArr: []
        }
    }

    getChartData(issue) {
        let labels = [];
        let values = [];
        let bgColors = [];

        const getRanColor = () => `#${Math.floor(Math.random() * 0xFFFFFF).toString(16)}`;

        if (this.state.ballot.length) {
            // Loop through positions through request
            issue.Positions.forEach(position => {
                labels.push(position.position_name);
                values.push(position.position_tally);
                bgColors.push(getRanColor());
            });

            let update = {
                id: issue.id,
                datasets: [{
                    data: values,
                    backgroundColor: bgColors,
                }],
                labels: labels
            };
            let chartArr = this.state.chartArr;
            chartArr.push(update);
            this.setState({
                chartArr: chartArr
            });
        }
    }


    loopIssues = (ballot) => {
        if (ballot) {
            let issue_nameArray = this.state.issue_nameArray;
            ballot.Issues.forEach(issue => {
                issue_nameArray.push(issue.issue_name);
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
                    {this.state.ballot.length ? (
                <div className="card-header" style={styles.header}>
                        <h2>Results of {this.state.ballot[0].ballot_name} Ballot:</h2>
                </div> ) : (
                <div className="card-header" style={styles.header}>
                    Loading
                </div>)}
            {this.state.chartArr.length ? (
                <div>
                    {this.state.chartArr.map(chart =>
                        (
                            <div>
                                <h3 style={styles.subheader}>{this.state.issue_nameArray[this.state.chartArr.indexOf(chart)]}</h3>
                                <Doughnut key={chart.id} data={chart}/>
                            </div>
                    ))}
                </div>
            ) : (
                <h1>No Results: {JSON.stringify(this.state.chartArr, null, 2)}</h1>
            )}
                <div className="card-body">

                    <h4 className="card-title">Here are the Results for the Ballot you selected</h4>
                    <p className="card-text">All voters are kept anonymous to ensure validity of votes.</p>


                </div>
                {this.state.ballot.length? (
                <div className="card-footer text-muted">
                    Voting closes: {this.state.ballot[0].ballot_expiration}
                </div>
                ) : (
                <div className="card-footer text-muted">
                    Voting closes:
                </div>
                )}
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
        backgroundColor: 'rgba(30, 30, 30, .55)'
    },
    header: {
        marginTop: '10px',
        padding: '20px',
        backgroundColor: 'rgba(30, 30, 30, .75)',
        fontSize: '30px',
        color: '#18ffe7'
    },
    subheader: {
        marginTop: '20px'
    }
}



export default VoteResults;
