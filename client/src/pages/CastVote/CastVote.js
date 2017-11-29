import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid/"
import { ListGroup, ListGroupItem, Table, Panel, FormGroup, Radio } from 'react-bootstrap';
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
                console.log(`does ${position.issue} equal ${prop.issue} ?`);
                if (position.issue == prop.issue) {
                    console.log(`i == ${i}`);
                    positionsArr.splice(positionsArr[i], 1);
                }
            });
            console.log(JSON.stringify(prop, null, 2));
            positionsArr.push(prop);
            this.setState({positions: positionsArr});
            console.log(this.state.positions);
        }
        else {
            console.log('prop: ' + JSON.stringify(prop.issue, null, 2));
            positionsArr.push(prop);
            this.setState({positions: positionsArr});
            console.log('positions: ' + JSON.stringify(positionsArr, null, 2));
            console.log(this.state.positions[0].issue);
        }
    };

    handleFormSubmit = e => {
        e.preventDefault();
        console.log("form submit");
        axios.put(`/api/ballots/vote/${this.state.ballot.id}`, {voter_id: this.state.voter_id, position: this.state.position})
    };

    render() {
        return(
            <Container>
                <Row>
                    <Col size="md-12">
                        {this.state.ballot.length > 0 &&
                                <div>
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

export default CastVote;
