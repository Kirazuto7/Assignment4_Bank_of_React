// src/components/UserProfile.js
// The UserProfile component is used to demonstrate the use of Route and Link.

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserProfile extends Component {
  render() {
    return (
        <div>
          <div className="navbar">
            <p>Bank of React</p>
            <Link to="/"><button>HOME</button></Link>
            <Link to="/login"><button>LOGIN</button></Link>
            <Link to="/debits"><button>DEBITS</button></Link>
            <Link to="/credits"><button>CREDITS</button></Link>
          </div> 
          
          <h1 className="header">User Profile</h1>
          <div className="User">Username: {this.props.userName}</div>
          <div className="Membership">Member Since: {this.props.memberSince}</div>
          
          <h2>Banking Information</h2>
          <table className="bankInfo">
            <tbody>
            <tr>
              <th>Balance: </th>
              <th>{this.props.accountBalance}</th>
            </tr>
            <tr>
              <th>Total Debit: </th>
              <th>{this.props.total_debit}</th>
            </tr>
            <tr>
              <th>Total Credit: </th>
              <th>{this.props.total_credit}</th>
            </tr>
            </tbody>
          </table>      
        </div>
    );
  }
}

export default UserProfile;