// src/components/AccountBalance.js

import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    return (
        <div class="container">
          Your Account Balance: ${this.props.accountBalance}
        </div>
    );
  }
}

export default AccountBalance;