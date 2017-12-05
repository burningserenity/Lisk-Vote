import React from 'react';
import { FormGroup, Radio } from 'react-bootstrap';
import './BallotCards.css';

const Issue = props =>
    <div className="card border-info" style={styles.voteCard.spacing}>
        {props.issue &&
            <div>
            <h3 className="card-header">{props.ballot_name}
            </h3>
               <strong style={styles.voteCard.text2}>Issue Title: </strong>
                <p style={styles.voteCard.text}>{props.issue.issue_name}</p>
                <hr style={styles.voteCard.line} />
                <FormGroup>
                <strong style={styles.voteCard.text2}>Options: </strong>
                    {props.issue.Positions.map(position => (
                        <Radio style={styles.voteCard.text3} key={position.id} name={`radioGroup-${props.issue.id}`} onClick={props.onClick.bind(this)} id={`p-${position.id}`} value={`${props.issue.id},${position.id}`}>{position.position_name}</Radio>
                    ))}
                </FormGroup>

                <p style={styles.voteCard.text4}>Expires: {props.ballot_expiration}</p>
                 </div>
        }
    </div>;

    const styles = {
        voteCard: {
            spacing: {
                marginBottom: '10px',
                padding: '5px 5px 20px 5px',
                backgroundColor: 'rgba(30, 30, 30, .65)'
            },
            text: {
                fontSize: '18px',
                color: 'aquamarine'
            },
            text2: {
                fontSize: '20px',
                textDecoration: 'underline'
            },
            text3: {
                fontSize: '16px'
            },
            text4: {
                color: '#3498DB'
            },
            line: {
                    height: '10px',
                    border: '0',
                    boxShadow: '0 10px 10px -10px #8c8b8b inset'
            }
        }
    }

export default Issue;
