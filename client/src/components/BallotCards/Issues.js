import React from 'react';
import { Panel, FormGroup, Radio } from 'react-bootstrap';

const Issue = props =>
    <div>
        {props.issue &&
            <Panel defaultExpanded header={props.ballot_name}>
                {props.issue.issue_name}
                <FormGroup fill>
                    {props.issue.Positions.map(position => (
                        <Radio key={position.id} name={`radioGroup-${props.issue.id}`} onClick={props.onClick.bind(this)} id={`p-${position.id}`} value={`${props.issue.id},${position.id}`}>{position.position_name}</Radio>
                    ))}
                </FormGroup>
                Expires: {props.ballot_expiration}
            </Panel>
        }
    </div>;

export default Issue;
