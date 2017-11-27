import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid/"
import { ListGroup, ListGroupItem, Table, Panel, FormGroup, Radio } from 'react-bootstrap';
import axios from 'axios';
import API from "../../utils/API";
import BallotCard from "../../components/BallotCards/BallotCards";
import BallotBtn from "../../components/BallotCards/BallotBtn";

class CastVote extends Component {

    state = {
        voter_id: 1,
        ballot: {}
    };

    loadBallot = () => {
        API.getBallot(1)
            .then( res => {
                this.setState({ballot: res.data});
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.loadBallot();
    };

    handleChange(e) {
        let prop = e.target.id;
        let change = {};

        change [prop] = e.target.value;
        this.setState(change);
    };

    handleFormSubmit = e => {
        e.preventDefault();
        if (this.state.issue_id) {
            console.log(this.state.issue_id);
            axios.get('/api/ballots/${this.state.ballot_id.Issues}').then(() => window.location.href = '/openvotes');
        }
    };

    render() {
        return(
            <Container>
                <Row>
                    <Col size="md-12">
                        <BallotCard ballot={this.state.ballot}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CastVote;
