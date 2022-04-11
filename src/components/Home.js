// src/components/Home.js
// The Home component is used to demonstrate the use of Link.

import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <>
      <header id="main-header">
        <div class="container">
            <h1>Bank of React</h1>
        </div>
      </header>

    <nav id="navbar">
      <div class="container">
          <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/credits">Credits</Link></li>
              <li><Link to="/debits">Debits</Link></li>
              <li><Link to="/userProfile">User Profile</Link></li>
          </ul>
      </div>
    </nav>

    <div class="container">
    <AccountBalance accountBalance={this.props.accountBalance}/>
    </div>

    <footer id="main-footer">
        <p>Copyright &copy; 2022, Jordan Sukhnandan, Oscar Andrade, Arifa Baksh, Alden Lee</p>
    </footer>
    </>
    



        // <div>
        //   <img src="https://picsum.photos/200/200" alt="bank"/>
        //   <h1>Bank of React</h1>

        //   <Link to="/userProfile">User Profile</Link>
        //   <br/>
        //   <Link to="/login">Login</Link>
        //   <br/>
        //   <Link to="/credits">Credits</Link>
        //   <br/>
        //   <Link to="/debits">Debits</Link>
          
        //   <AccountBalance accountBalance={this.props.accountBalance}/>
        // </div>
    );
  }
}

export default Home;