import React from 'react';
import { FormGroup } from 'react-bootstrap';
import Issue from "./Issues"

const BallotCard = props =>

    <div>
        <FormGroup id='ballotForm' name='ballotForm'>
        {props.ballot[0].Issues.map( issue => (
            <Issue ballot_name={props.ballot[0].ballot_name} ballot_expiration={props.ballot[0].ballot_expiration} issue={issue} onClick={props.handleChange}/>
        ))}
    </FormGroup>
    </div>;

export default BallotCard;
