import React, { Component } from "react";
import AddIssues3 from "./Addissues3";

class AddIssues2 extends Component {
   constructor() {
        super();

        this.state = {
            submitted: false,
            submitted2: false,
            issues:[],
            issues_Values:[],
            follow:false
         };
    }
  
  componentDidMount() {
        this.setState({issues:this.props.fieldValues.issues});
        this.setState({options:this.props.fieldValues.issues.options});
  };


  addnewissues = e => {
    e.preventDefault();
    const newInput = this.state.issues.length;
    this.setState({ issues: this.state.issues.concat(newInput)},function(){
            return;
    });
    
  };

  saveissues = (issues_Values) => {
      return function() {
      const issuesValues = Object.assign({}, issuesValues, issues_Values);
    }
  };

  handleOptionsChange = (index,event) => {
    
    var option = this.state.option.slice();
    option[index] = event.target.value;
    this.setState({option:option})
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      submitted : true
    });

  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({'submitted2': true });
  };

  

  render () {
    return (
      <div>
        <h2>Adding Issues</h2>
          <ul className="form-fields">
                <button className="btn btn-success" onClick={this.addnewissues}>
                      Add New Issue
                </button>
                {this.state.issues.map(item => (
                    <ul key={item} id={item}>
                       <AddIssues3   fieldValues={this.issues}
                                     saveValues={this.saveissues}/>
                   </ul>
               ))}
              <li className="form-footer">
               <button className="btn -default pull-left" onClick={this.props.previousStep}>Back</button>
               <button disable={!(this.state.follow)} className="btn -primary pull-right" onClick={this.nextStep}>Save &amp; Continue</button>
             </li>
        </ul>
      </div>
    )
  };

  nextStep = ()=> {
    // Get values via querySelector
    this.props.fieldValues.issue_name = this.issue_name.value;
    this.props.fieldValues.options = this.state.option;
    console.log(this.state.option);
    var data = {
      issue_name : this.issue_name.value,
      options : this.state.option
    }
    console.log(data);
    this.props.saveValues(data) 
    this.props.nextStep()
  };  
}

export default AddIssues2;