import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid/";
import API from "../../utils/API";
import "./OpenVotes.css";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import  { Link } from 'react-router-dom';



class OpenVotes extends Component {
    state = {
        ballots: []
    };

    componentDidMount() {
        this.loadBallots();
    }

    loadBallots() {
        API.getBallots()
            .then( res => {
                console.log(res.data);
                this.setState({ballots: res.data});
            })
            .catch(err => console.log(err));
    };


    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-8 centered">
                        <h1 style={styles.header}>Open Ballots</h1>
                        {this.state.ballots.length ? (
                            <Row>
                            <Col size="md-8 centered">
                            <ListGroup>
                                {this.state.ballots.map(ballot => (
                                    <ListGroupItem key={ballot.id} style={styles.listItem} >
                                        {/*This will be a link to register for the ballot clicked on*/}
                                            <p><strong style={styles.liContents}>
                                                Ballot Name/Topic: </strong><em style={styles.emphasis}>{ballot.ballot_name}</em>
                                                <br/>
                                                <strong style={styles.liContents}>Ballot Expires: </strong> <em style={styles.emphasis}>{ballot.ballot_expiration}</em>

                                            </p>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                            </Col>
                            </Row>
                        ) : (
                            <h3>No Results to Display</h3>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const styles = {
    header: {
        marginTop: '10px',
        backgroundColor: 'rgba(30, 30, 30, .65)',
        padding: '20px',
        border: 'solid',
        borderColor: '#3498DB',
        borderWidth: '1px',
        borderRadius: '0.25rem'
    },
    listItem: {
        marginBottom: '10px',
        backgroundColor: 'rgba(30, 30, 30, .65)',
        borderColor: '#3498DB'
    },
    liContents: {
        fontSize: '1.25rem',
        color: 'white'
    },
    emphasis: {
        color: '#18ffe7',
        fontSize: '1.1rem'
    }

}

export default OpenVotes;
