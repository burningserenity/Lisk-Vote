import React, { Component } from "react";
import { Container } from "../../components/Grid/";
import Success from "./Success";
import Confirmation from "./Confirmation";
import Ballotinfo from "./Ballotinfo";
import AddIssues from "./Addissues";
import axios from 'axios';
import Moment from 'moment';
//import "./NewUser.css";

const fieldValues = {
  ballot_name  : null,
  ballot_start : Moment(),
  ballot_expiration : Moment().add(1, 'day'),
  issue_name   : [],
  options   : []
}

class AddBallot extends Component {
    
    constructor() {
        super();

        this.state = {
            step: 1
          //  name: null,
          //  password : null,
        };
    }
       
    handleChange(e) {
        let prop = e.target.id;
        let change = {};

        change[prop] = e.target.value;
        this.setState(change);
    }


    saveValues = (field_Value) => {
    return function() {
      const fieldValues = Object.assign({}, fieldValues, field_Value);
    }

   };

    nextStep = () => {
        this.setState({
           step : this.state.step +1
        });
    };

    previousStep = () => {
        this.setState({
           step : this.state.step -1
        });
    };

   
    SubmitRegistration = () => {
    console.log("Me llamaron");
    console.log(this.props.fieldValues);
    if (this.props.fieldValues) {
        console.log(this.props.fieldValues);
         axios({
            method: 'post',
            url: `/api/ballots/register/`,
            data: {
                ballot_name: this.props.fieldValues.ballot_name,
            }
        }).then(() => {
            this.nextStep();
        });
     }
    };

    renderSwitch = () => {
      switch (this.state.step) {
       case 1:
       return <Ballotinfo   fieldValues={fieldValues}
                            nextStep={this.nextStep}
                            previousStep={this.previousStep}
                            saveValues={this.saveValues} />
      case 2:
        return <AddIssues   fieldValues={fieldValues}
                            nextStep={this.nextStep}
                            previousStep={this.previousStep}
                            saveValues={this.saveValues} />
      case 3:
        return <Confirmation fieldValues={fieldValues}
                             previousStep={this.previousStep}
                             submitRegistration={this.nextStep} />
      case 4:
        return <Success fieldValues={fieldValues} />
      
      default: <Ballotinfo  fieldValues={fieldValues}
                            nextStep={this.nextStep}
                            previousStep={this.previousStep}
                            saveValues={this.saveValues} />
      }
    };

    render(){

      const style = {
          width : (this.state.step / 4 * 100) + '%'
      }
      
      return (
            <Container>
              <h1>Adding a New Ballot</h1>
            <span className="progress-step">Step {this.state.step}</span>
            <progress className="progress" style={style}></progress>
            {this.renderSwitch()}
            </Container> 
      
         );
    }
}

export default AddBallot;
