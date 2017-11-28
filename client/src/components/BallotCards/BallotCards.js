import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Table, Panel, FormGroup, Radio } from 'react-bootstrap';

class BallotCard extends Component  {
    constructor(props) {
        super(props);

        handleChange(e) {
            let prop = e.target.id;
            let change = {};
            change [prop] = e.target.value;
            this.setState(change);
        }
    }
    render() {
        return (
            <div>
                {props.ballot[0].Issues.map( issue => (
                    <Panel defaultExpanded header={props.ballot[0].ballot_name}>
                        {issue.issue_name}
                        <FormGroup fill>
                            {issue.Positions.map( position => (
                                <Radio name="radioGroup" onchange={this.handleChange.bind(this)} id={position.position_id}>{position.position_name}</Radio>
                            ))}
                        </FormGroup>
                        Expires: {props.ballot[0].ballot_expiration}
                    </Panel>
                ))}
            </div>;
        )
    }
}

export default BallotCard;
