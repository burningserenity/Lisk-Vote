import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid/"
import axios from 'axios';
import API from "../../utils/API";
import BallotCard from "../../components/BallotCards/BallotCards";
import BallotBtn from "../../components/BallotCards/BallotBtn";

class CastVote extends Component {

    state = {
        voter_id: this.props.match.params.voter,
        ballot: [],
        positions: []
    };

    loadBallot = () => {
        API.getBallot(this.props.match.params.id)
            .then( res => {
                this.setState({ballot: [res.data]});
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.loadBallot();
    };

    handleChange = e => {
        let positionsArr = this.state.positions;
        console.log(positionsArr);
        console.log('target: ' + e.target.value);
        let propArr = [];
        propArr = e.target.value.split(",");
        let prop = {
            issue: propArr[0],
            position: propArr[1]
        }
        if (positionsArr.length > 0) {
            console.log('positions: ' + JSON.stringify(positionsArr, null, 2));
            positionsArr.forEach((position, i) => {
                if (position.issue === prop.issue) {
                    positionsArr.splice(positionsArr[i], 1);
                }
            });
            positionsArr.push(prop);
            this.setState({positions: positionsArr});
            console.log(this.state.positions);
        }
        else {
            positionsArr.push(prop);
            this.setState({positions: positionsArr});
        }
    };

    handleFormSubmit = e => {
        e.preventDefault();
        console.log("form submit");
        console.log(this.state.positions);
        let positionArr = this.state.positions;
        let positionOnly = positionArr.map(position => {
            return position.position
        });
        API.castVote(`/api/ballots/vote/${this.state.ballot[0].id}`, this.state.voter_id, positionOnly).then(() => {
            window.location.href = `/voteresults/${this.state.ballot[0].id}`;
        });
    };

    render() {
        return(
            <Container>
                <Row>

                    <Col size="md-8 centered">
                    <h2 style={styles.ballotCards.heading}>Please Select One Option <br /> for Each Issue</h2>
                        {this.state.ballot.length > 0 &&
                                <div style={styles.ballotCards.bCard}>
                                <BallotCard ballot={this.state.ballot} issues={this.state.ballot[0].Issues} handleChange={this.handleChange} />
                                <BallotBtn handleFormSubmit={this.handleFormSubmit}/>
                            </div>
                        }
                    </Col>
                </Row>

            </Container>
        );
    }
}

const styles = {
    ballotCards: {
        bCard: {
            backgroundColor: 'rgba(30, 30, 30, .65)',
            padding: '30px 30px 50px 30px'
        },
        heading: {
            textAlign: 'center',
            backgroundColor: 'rgba(30, 30, 30, .65)',
            marginTop: '10px',
            padding: '10px',
            border: 'solid',
            borderColor: '#3498DB',
            borderWidth: '1px',
            borderRadius: '0.25rem'
        }
    }
}


export default CastVote;
