// src/components/Credits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Credits.css';


class Credits extends Component {
  constructor(props)
  {
    super(props);

    this.state = 
    {
      newCredit: 
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

  creditsView = () => {
    console.log(this.state.total_credit);
    return this.props.credits.map((credit) => {
        let date = credit.date.slice(0,10);
        return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    }) 
  }
//retrieve credit amount, description and date separately
  descriptionView = () => {
    return this.props.credits.map((credit) => {
        return <p key={credit.id}>{credit.description}</p>
    }) 
  }

  priceView = () => {
    return this.props.credits.map((credit) => {
        return <p key={credit.id}>{credit.amount}</p> 
    }) 
  }

  dateView = () => {
    return this.props.credits.map((credit) => {
      let date = credit.date.slice(0,10);
      return <p key={credit.id}>{date}</p> 
    }) 
  }

  handleChange = (e) => {
    let new_credit = {...this.state.newCredit};
    let inputField = e.target.name;
    let inputValue = e.target.value;

    //generate a random id
    let newID = String(Date.now());
    new_credit["id"] = newID;

    if(inputField === "description")
    {
      new_credit["description"] = inputValue;
    }

    if(inputField === "amount")
    {
      new_credit["amount"] = parseFloat(inputValue);
    }

    this.setState({newCredit: new_credit});
  }

  handleSubmit = (e) => {
    alert('A new credit was submitted.');
    e.preventDefault();
    this.props.addCredit(this.state.newCredit);

    let description_input_field = document.getElementById('description');
    let amount_input_field = document.getElementById('amount');
    description_input_field.value = '';
    amount_input_field.value = '';

    this.resetNewCredit();
  }

  resetNewCredit = () => {
    let credits = {...this.statenewCredit};
    credits.description = "";
    credits.amount = 0;
    credits.id = "";
    credits.date = this.getCurrentDate();
    this.setState({newCredit: credits});
  }

  render() {
    return (
      <div>
    	   <h1>Credits</h1>
    	 
           <form onSubmit={this.handleSubmit}>
             <h2> Enter a New Transaction </h2>
             <input id="description" type="text" placeholder="Enter Item Name" name="description" onChange={this.handleChange} value={this.state.description}/>
             <input id="amount" type="number" placeholder="Enter Item Price" name="amount" step="0.01" onChange={this.handleChange} value={this.state.amount}/>
             <button type="submit">Add Credit</button>
           </form>
           <h2> View All Transactions:</h2>
           {/* <h3>Transaction List: {this.creditsView()}</h3> */}
           
           <div className = "row">
             <div className = "column">
               <h3 className='column-headers'>Credit Amount</h3>
               <h4>{this.priceView()}</h4>
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
         
          <h2>Total Amount of Credits: {this.props.total_credit}</h2>
          <h2>Account Balance: {this.props.accountBalance}</h2>

          <Link to="/"><button>Home</button></Link>

    	</div>
    );
  }

} 

export default Credits;