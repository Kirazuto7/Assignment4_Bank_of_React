// src/components/Debits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
        amount: -1,
        date: ""
      }
    }
  }

  debitsView = () => {
    console.log(this.state.total_debit);
    return this.props.debits.map((debit) => {
        let date = debit.date.slice(0,10);
        return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    }) 
  }

 
  render() {
    return (
      <div>
    	   <h1>Debits</h1>
    	 
           <form onSubmit={this.props.addDebit}>
             <input type="text" name="description" />
             <input type="number" name="amount" />
             <button type="submit">Add Debit</button>
           </form>
           <h3>Transaction List: {this.debitsView()}</h3>
           
           <h2>Total Amount of Debits: {this.props.total_debit}</h2>
           <Link to="/">Home</Link>
    	</div>
    );
  }

} 

export default Debits;