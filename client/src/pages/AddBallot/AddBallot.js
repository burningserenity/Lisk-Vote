import React, { Component } from "react";
import { FormBtn, Input } from "../../components/Form/";
import { Col, Row, Container } from "../../components/Grid/";
import { Jumbotron } from "../../components/Jumbotron";
import { DateTime } from 'react-datetime-bootstrap';
import axios from "axios";
//import "./NewUser.css";

class AddBallot extends Component {
    constructor() {
        super();
        this.state = {
            ballot_Name: "",
            ballot_start: "",
            ballot_expiration: "",
            issue_name: "",
            position_name:""
        };
    }

    handleChange(e) {
        let prop = e.target.id;
        let change = {};

        change[prop] = e.target.value;
        this.setState(change);
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = e => {
        e.preventDefault();
        if (this.state.voter_firstName && this.state.voter_lastName && this.state.voter_passphrase && this.state.voter_email) {
            let submitArr = [this.state.voter_firstName, this.state.voter_lastName, this.state.voter_passphrase, this.state.voter_email];
            console.log(submitArr);
            axios.post('/api/voters', {firstName: submitArr[0], lastName: submitArr[1], passphrase: submitArr[2], email: submitArr[3]}).then(() => window.location.href = '/openvotes')
              .catch(err => console.log(err));
        }
    };

    render() {
    return (
        <Container fluid>
            <Row>
                <Col size = "md-12">
                    <Jumbotron>
                        <h2 style={styles.headings.h3}>Add a New Ballot</h2>
                    </Jumbotron>
                    <Col size="md-12 centered">
                        <form align="center">
                        <h4 style={styles.headings.h4}>What do you want Submit a Ballot</h4>
                            <Input
                                value={this.state.ballot_Name}
                                onChange={this.handleInputChange.bind(this)}
                                id="ballot_Name"
                                name="ballot_Name"
                                placeholder="Put the General Issue to Ballot i.e 'Lunch Plan','Student Council Ballot'"
                            />
                            <h4 style={styles.headings.h4}>Last Name</h4>
                            <Input
                                value={this.state.voter_lastName}
                                onChange={this.handleInputChange.bind(this)}
                                id="voter_lastName"
                                name="voter_lastName"
                                placeholder="Tadlock (Required)"
                            />
                            <h4 style={styles.headings.h4}>Email</h4>
                            <Input
                                value={this.state.voter_email}
                                onChange={this.handleInputChange.bind(this)}
                                id="voter_email"
                                name="voter_email"
                                placeholder="jd@jdtdesigns.com (Required)"
                            />
                            <h4 style={styles.headings.h4}>Passphrase</h4>
                            <Input
                                value={this.state.voter_passphrase}
                                onChange={this.handleInputChange.bind(this)}
                                type="password"
                                id="voter_passphrase"
                                name="voter_passphrase"
                                placeholder="******** (Required)"
                            />
                            <FormBtn onClick={this.handleFormSubmit.bind(this)}/>
                        </form>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
    }
}
const styles = {
    headings: {
        h4: {
            textAlign: 'left'
        },
        h2: {
            textAlign: 'center',
            fontSize:  '3.3rem'
        }
    }
}




    export default NewUser;
