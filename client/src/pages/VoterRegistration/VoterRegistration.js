import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid/";
import { Checkbtn } from "../../components/Form/";
import { JumboBtn } from "../../components/Jumbotron/"
import { FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import API from "../../utils/API";

class VoterRegistration extends Component {

    state = {
        voter_id: this.props.match.params.voter,
        id : this.props.match.params.voter,
        ballot: [],
        ballotIndex: 0,
        Voter: [],
        positions: []
    };

    loadBallots = () => {
        API.getBallots()
            .then( res => {
                this.setState({ballots: res.data});
            })
            .catch(err => console.log(err));
    };

    loadVoters = ballot => {
        API.getVoters()
            .then( res => {
                this.setState({ Voter: res.data,
                ballotIndex: ballot})
                console.log(res.data);
                console.log(ballot);
            })
           .catch(err => console.log(err));
    };

    componentDidMount() {
        this.loadBallots();
    };

    handlelinkChange = event => {
     event.preventDefault();
     event.stopPropagation();
       this.loadVoters(this.setState.ballot_id);
    };

    handleSelect = event => {
        console.log(event.target)
        const { name, value } = event.target;
        this.setState({
        [name]: value
      });
    };

    handleFormSubmit = event => {
     event.preventDefault();
     if (this.state.FormControl) {
        console.log(this.state.FormControl[0]);
        console.log(this.state.FormControl[2]);
         axios({
            method: 'put',
            url: `/api/ballots/register/${this.state.FormControl[2]}`,
            data: {
                voter_id: this.state.FormControl[0],
                id: this.state.FormControl[2]
            }
        }).then(() => {
            window.location.href = `/VoterRegistration`;
        });

    }
    };

    render() {
      return(
          <Container>
             <Row>
                <Col size="md-12">
                  <h1>Assign A Ballot</h1>
                </Col>
             </Row>
             <Row>
               <Col size="md-5.5" style={styles.registration.regCard} centered>
                 <h2>Select a Ballots to Register Voters:</h2>
                    {this.state.ballots ? (
                      <ListGroup>
                        {this.state.ballots.map(ballot => (
                           <ListGroupItem key={ballot.id}>
                                <strong>
                                   Ballot Name/Topic: {ballot.ballot_name} <br/> Ballot Expires: {ballot.ballot_expiration}
                                 </strong>
                                 <Checkbtn onClick={() => this.loadVoters({ballot : ballot.id})}>
                                 </Checkbtn>
                           </ListGroupItem>

                        ))}
                      </ListGroup>
                    ) : (
                        <h3>No Results to Display</h3>
                    )}
               </Col>
               <Col size="md-5.5" style={styles.registration.regCard} centered>
                 <h2>Select Voters for Ballot:</h2>
                 {this.state.Voter ? (
                     <FormControl componentClass="select" onChange={this.handleSelect.bind(this)} name="FormControl">
                      {this.state.Voter.map((Voter) => {
                       return (<option key={Voter.id} value={[Voter.id,this.state.ballotIndex.ballot]}>{this.state.ballotIndex.ballot+' '+Voter.voter_address+' '+Voter.voter_firstName+' '+Voter.voter_firstName}</option>)
                    })
                   }
                   </FormControl>
                 ) : (
                    <h3>No Voters</h3>
                 )}
               </Col>
               <Col size="md-11" style={{ marginTop: '10px' }}>
                 <JumboBtn
                   disabled={!(this.state.FormControl)}
                   onClick={this.handleFormSubmit}>
                 </JumboBtn>
               </Col>

             </Row>
          </Container>
        );
    }
 }
const styles = {
    registration: {
        regCard: {
          marginLeft: '5px',
            backgroundColor: 'rgba(30, 30, 30, .65)',
            padding: '30px'

        }
    }
}

export default VoterRegistration;
