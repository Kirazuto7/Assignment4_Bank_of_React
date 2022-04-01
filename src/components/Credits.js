// src/components/Credits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
        date: ""
      }
    }
  }

  creditsView = () => {
    console.log(this.state.total_credit);
    return this.props.credits.map((credit) => {
        let date = credit.date.slice(0,10);
        return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    }) 
  }

 
  render() {
    return (
      <div>
    	   <h1>Credits</h1>
    	 
           <form onSubmit={this.props.addCredit}>
             <input type="text" name="description" />
             <input type="number" name="amount" />
             <button type="submit">Add Credit</button>
           </form>
           <h3>Transaction List: {this.creditsView()}</h3>
           
           <h2>Total Amount of Credits: {this.props.total_credit}</h2>
           <h2>Account Balance: {this.props.accountBalance}</h2>
           <Link to="/">Home</Link>
    	</div>
    );
  }

} 

export default Credits;