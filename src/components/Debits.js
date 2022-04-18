// src/components/Debits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Debits.css';

class Debits extends Component {
  constructor(props)
  {
    super(props);

    this.state = 
    {
      newDebit: 
      {
        id: "",
        description: "",
        amount: 0,
        date: this.getCurrentDate()
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getCurrentDate = () => {
    // Formatted string containing today's date
    let dateFormat = new Date();
    var day = String(dateFormat.getDate()).padStart(2, '0');
    var month = String(dateFormat.getMonth() + 1).padStart(2, '0'); // Month index starts at 0 eg: Jan = 0, Feb = 1
    var year = dateFormat.getFullYear();
    dateFormat = year + '-' + month + '-' + day;
    return dateFormat;
  }

  debitsView = () => {
    return this.props.debits.map((debit) => {
        let date = debit.date.slice(0,10);
        return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    }) 
  }

  //get debit amount, description and date separately
  amountView = () => {
    return this.props.debits.map((debit) => {
        return <p key={debit.id}>{debit.amount}</p>
    }) 
  }

  descriptionView = () => {
    return this.props.debits.map((debit) => {
        return <p key={debit.id}>{debit.description}</p>
    }) 
  }

  dateView = () => {
    return this.props.debits.map((debit) => {
        let date = debit.date.slice(0,10);
        return <p key={debit.id}>{date}</p>
    }) 
  }

  // When the user inputs the description and amount, the input is captured and the state is updated
  handleChange = (e) => {
      let new_debit = {...this.state.newDebit};
      let inputField = e.target.name;
      let inputValue = e.target.value;
      
      // Generate a random id value
      let newID = Date.now();
      new_debit["id"] = newID;
      
      if(inputField === "description")
      {
        new_debit["description"] = inputValue;
      }

      if(inputField === "amount") 
      {
        new_debit["amount"] = parseFloat(inputValue);
      }

      this.setState({newDebit: new_debit});
  }

  // Stores the users debit data and updates the page 
  handleSubmit = (e) => {
    alert('A new debit was submitted.');
    e.preventDefault();
    this.props.addDebit(this.state.newDebit);

    // Clear the input fields
    let description_input_field = document.getElementById('description');
    let amount_input_field = document.getElementById('amount');
    description_input_field.value = '';
    amount_input_field.value = '';

    this.resetNewDebit();
  }

  // Resets the current state of newDebit
  resetNewDebit = () => {
    let debits = {...this.state.newDebit}
    debits.description = "";
    debits.amount = 0;
    debits.id = "";
    debits.date = this.getCurrentDate();
    this.setState({newDebit: debits});
  }
 
  render() {
    return (
      <div>
        <header id="main-header">
        <div class="container">
            <h1>Bank of React</h1>
        </div>
      </header>

    <nav id="navbar">
      <div class="container">
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/credits">Credits</Link></li>
              <li><Link to="/userProfile">User Profile</Link></li>
          </ul>
      </div>
    </nav>
    	   <h1>Debits</h1>
           <form onSubmit={this.handleSubmit}>
           <h2> Enter a New Transaction </h2>
             <input id="description" type="text" placeholder="Enter Item Name" name="description" onChange={this.handleChange} value={this.state.description}/>
             <input id="amount" type="number" placeholder="Enter Item Price" name="amount" step="0.01" onChange={this.handleChange} value={this.state.amount}/>
             <button type="submit" >Add Debit</button>
           </form>

           <h2> View All Transactions:</h2>
           {/* <h3>Transaction List: {this.debitsView()}</h3> */}

           <div className = "row">
             <div className = "column">
               <h3 className='column-headers'>Debit Amount</h3>
               <h4>{this.amountView()}</h4>
              </div>
              
              <div className ="column">
                <h3 className='column-headers'>Item Description</h3>
                <h4> {this.descriptionView()} </h4>
              </div>
              
              <div className ="column" >
                <h3 className='column-headers'>Date Added</h3>
                <h4> {this.dateView()} </h4>
              </div>
            </div>
           
           <h2>Total Amount of Debits: {this.props.total_debit}</h2>
           <h2>Account Balance: {this.props.accountBalance}</h2>
           
    	</div>
    );
  }

} 

export default Debits;