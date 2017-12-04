import React, { Component } from "react";
import Moment from 'moment';
import DateTimePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Ballotinfo extends Component {
constructor() {
    super();
    this.state = {
      startDate : Moment(),
      startDate2: Moment()
    };
    this.handleChange = this.handleChange.bind(this);
}    

 componentDidMount() {
        this.setState({startDate:this.props.fieldValues.ballot_start});
        this.setState({startDate2:this.props.fieldValues.ballot_expiration});
    };

handleChange = (value) => {
   this.setState({
      startDate : Moment(value)

   });
};

handleChange2 = (value1) => {
   this.setState({
      startDate2 : Moment(value1)
   });
};

handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  render() {
    return (
      <div>
        <h2>Ballot Details</h2>
        <ul className="form-fields">
          <li>
            <label>Ballot Topic:</label>
            <input type="text" ref={(ref) => this.ballot_name = ref} defaultValue={this.props.fieldValues.ballot_name} name="ballot_name" placeholder="'Dinner Plan','Student Council Ballot'" onChange={this.handleInputChange}/>
          </li>
          <li>
            <label>Ballot Start</label>
            <DateTimePicker selected={this.state.startDate} onChange={this.handleChange} />
          </li>
          <li>
            <label>Ballot Expiration</label>
            <DateTimePicker selected={this.state.startDate2} onChange={this.handleChange2}/>
          </li>
            <button className="btn btn-success" disabled={!(this.state.ballot_name)} onClick={this.nextStep}>Save &amp; Continue</button>
       </ul>
     </div>
    )
  }

  nextStep = (e) => {
    e.preventDefault()
     this.props.fieldValues.ballot_name = this.ballot_name.value;
     this.props.fieldValues.ballot_start = this.state.startDate;
     this.props.fieldValues.ballot_expiration = this.state.startDate2;
     console.log(this.props.fieldValues.ballot_start);
     console.log(this.props.fieldValues.ballot_expiration);
     const data = {
        ballot_name: this.props.fieldValues.ballot_name,
        ballot_start: this.props.fieldValues.ballot_start,
        ballot_expiration: this.props.fieldValues.ballot_expiration,
     }
    //console.log(data);
    this.props.saveValues(data)
    this.props.nextStep()
  }
};

export default  Ballotinfo;
