import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Table, Panel, FormGroup, Radio } from 'react-bootstrap';

class BallotCard extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <h2>{props.ballot.ballot_name}</h2>
                <IssueName key={props.ballot.ballot_name.Issues}
            </div>
        );
    }
}

export default BallotCard;
