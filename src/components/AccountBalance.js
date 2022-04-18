// src/components/AccountBalance.js

import React, {Component} from 'react';
import './AccountBalance.css';
import logo from '../images/react.png'

class AccountBalance extends Component {
  render() {
    return (
      
        <div class="container">
          <div id="account_balance">Your Account Balance: ${this.props.accountBalance}</div>
          <br></br>
          <br></br>
          <img id= "react_logo" src={logo} alt="Logo" />
        </div>
    );
  }
}

export default AccountBalance;