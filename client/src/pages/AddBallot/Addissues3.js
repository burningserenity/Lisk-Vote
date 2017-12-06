import React, { Component } from "react";

class AddIssues2 extends Component {
   
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
        this.setState({issue_name:this.props.issue_name});
        this.setState({options:this.props.options})
  };

  
  addoptions = e => {
    e.preventDefault();
    const newInput = this.state.inputs.length;
    this.setState({ inputs: this.state.inputs.concat(newInput)},function(){
        return;
    });
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
    var data = {
      issue_name : this.issue_name.value,
      options : this.state.option
    }  
    console.log(data);
  };


  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({'submitted2': true });
  };

  render () {
    return (
      <div>
        <h2>Set Issue</h2>
        <ul className="form-fields">
             <li>
                <label>Set the Question:</label>
                 <input type="text" ref={(ref) => this.issue_name = ref} defaultValue={this.state.issue_name} 
                  name="issue_name" placeholder="'i.e Who you want to be the student Councelor?'" onChange={this.handleInputChange}/>
             </li>
                {this.state.submitted ? (
                   <button className="btn btn-success" onClick={this.addoptions}>
                       Add Options
                   </button>
                   ) : (
                    <label></label>
                 )}
                   {this.state.inputs.map(item2 => (
                      <ul key={item2} id={item2}>
                        <li>
                           <input type="text" ref={'name'+[item2]} name={'option'+[item2]} defaultValue={this.state.option[item2]} value={this.state.option[item2]} onChange={this.handleOptionsChange.bind(this, item2)}/>
                         </li>
                     </ul>
                  ))}
          </ul>
      </div>
    )
 }

  //nextStep = ()=> {
    // Get values via querySelector
   // this.props.fieldValues.issue_name = this.issue_name.value;
    //this.props.fieldValues.options = this.state.option;
    //console.log(this.state.option);
    //var data = {
    //  issue_name : this.issue_name.value,
   //   options : this.state.option
   // }
   // console.log(data);
   // this.props.saveissues(data) 
   // this.props.nextStep()
   //};  
}

export default AddIssues2;
