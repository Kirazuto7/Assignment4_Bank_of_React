// src/components/Debits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Debits extends Component {
  constructor(props)
  {
    super(props);

    // Formatted string containing today's date
    let dateFormat = new Date();
    var day = String(dateFormat.getDate()).padStart(2, '0');
    var month = String(dateFormat.getMonth() + 1).padStart(2, '0'); // Month index starts at 0 eg: Jan = 0, Feb = 1
    var year = dateFormat.getFullYear();
    dateFormat = year + '-' + month + '-' + day;

    this.state = 
    {
      newDebit: 
      {
        id: "",
        description: "",
        amount: 0,
        date: dateFormat
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Generates a random id string
  guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

  debitsView = () => {
    return this.props.debits.map((debit) => {
        let date = debit.date.slice(0,10);
        return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    }) 
  }

  // When the user inputs the description and amount, the input is captured and the state is updated
  handleChange = (e) => {
      let new_debit = {...this.state.newDebit};
      let inputField = e.target.name;
      let inputValue = e.target.value;
      
      // Generate a random id value
      let newID = this.guid();
      new_debit["id"] = newID;
      
      if(inputField === "description")
      {
        new_debit[inputField] = inputValue;
      }

      if(inputField === "amount") 
      {
        new_debit[inputField] = parseFloat(inputValue);
      }

      this.setState({newDebit: new_debit});
  }

  // Stores the users debit data and updates the page 
  handleSubmit = (e) => {
    alert('A new debit was submitted.');
    e.preventDefault();
    this.props.addDebit(this.state.newDebit);

    // Clear the input fields
    let description_input = document.getElementById('description');
    let amount_input = document.getElementById('amount');
    description_input.value = '';
    amount_input.value = '';

    this.resetNewDebit();
  }

  // Resets the current state of newDebit
  resetNewDebit = () => {
    let debits = {...this.state.newDebit}
    debits.description = "";
    debits.amount = 0;
    this.setState({newDebit: debits});
  }
 
  render() {
    return (
      <div>
    	   <h1>Debits</h1>
    	 
           <form onSubmit={this.handleSubmit}>
             <input id="description" type="text" name="description" onChange={this.handleChange} value={this.state.description}/>
             <input id="amount" type="number" name="amount" step="0.01" onChange={this.handleChange} value={this.state.amount}/>
             <button type="submit" >Add Debit</button>
           </form>
           <h3>Transaction List: {this.debitsView()}</h3>
           
           <h2>Total Amount of Debits: {this.props.total_debit}</h2>
           <h2>Account Balance: {this.props.accountBalance}</h2>
           <Link to="/">Home</Link>
    	</div>
    );
  }

} 

export default Debits;