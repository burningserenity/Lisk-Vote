import React, { Component } from "react";

class AddIssues extends Component {
   constructor() {
        super();

        this.state = {
            submitted: false,
            submitted2: false,
            option:[],
            inputs:[]
        };
    }
  
  componentDidMount() {
        this.setState({issue_name:this.props.fieldValues.issue_name});
        this.setState({options:this.props.fieldValues.options})
  };


  addoptions = e => {
    e.preventDefault();
    const newInput = this.state.inputs.length;
    this.setState({ inputs: this.state.inputs.concat(newInput)},function(){
            return;
    });
    //$('.online-est').next('.room-form').remove();
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
           <li>
             <label>Set the Question:</label>
             <input type="text" ref={(ref) => this.issue_name = ref} defaultValue={this.props.fieldValues.issue_name} 
             name="issue_name" placeholder="'i.e Who you want to be the student Councelor?'" onChange={this.handleInputChange}/>
           </li>
            
             {this.state.submitted ? (
               <button className="btn btn-success" onClick={this.addoptions}>
                Add Options
               </button>
               ) : (
                 <label></label>
               )}

               {this.state.inputs.map(item => (
                    <ul key={item} id={item}>
                      <li>
                        <input type="text" ref={'name'+[item]} name={'option'+[item]} defaultValue={this.props.fieldValues.options[item]} value={this.state.option[item]} onChange={this.handleOptionsChange.bind(this, item)}/>
                      </li>
                    </ul>
                  ))}
              <li className="form-footer">
               <button className="btn -default pull-left" onClick={this.props.previousStep}>Back</button>
               <button className="btn -primary pull-right" onClick={this.nextStep}>Save &amp; Continue</button>
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

export default AddIssues;