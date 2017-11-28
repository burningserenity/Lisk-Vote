import React from 'react';
import { ListGroup, ListGroupItem, Table, Panel, FormGroup, Radio } from 'react-bootstrap';

const BallotCard = props => 
    <div>
        <h2>{props.ballot[0].ballot_name}</h2>
    <p>{JSON.stringify(props.issues[1].issue_name, null, 2)}</p>
        <div>
        </div>
    </div>;

export default BallotCard;
