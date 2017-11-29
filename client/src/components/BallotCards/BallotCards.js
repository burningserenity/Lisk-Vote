import React from 'react';
import { ListGroup, ListGroupItem, Table, Panel, FormGroup, Radio } from 'react-bootstrap';

const BallotCard = props =>

    <div>
        {props.ballot[0].Issues.map( issue => (
            <Panel defaultExpanded header={props.ballot[0].ballot_name}>
                {issue.issue_name}
                <FormGroup fill>
                    {issue.Positions.map( position => (
                        <Radio name="radioGroup" onClick={props.handleChange.bind(this)} id={`p-${position.position_id}`}>{position.position_name}</Radio>
                    ))}
                </FormGroup>
                Expires: {props.ballot[0].ballot_expiration}
            </Panel>
        ))}
    </div>;

export default BallotCard;
