import React from 'react';
import { FormGroup } from 'react-bootstrap';
import Issue from "./Issues"

const BallotCard = props =>
        <FormGroup key={props.ballot[0].id} id='ballotForm' name='ballotForm'>
        {props.ballot[0].Issues.map( issue => (
            <Issue key={issue.id} ballot_name={props.ballot[0].ballot_name} ballot_expiration={props.ballot[0].ballot_expiration} issue={issue} onClick={props.handleChange}/>
        ))}
    </FormGroup>;

export default BallotCard;
