// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {  accountBalance: 14568.27,
                    currentUser: {
                                    userName: 'Joe Smith',
                                    memberSince: '07/23/96',
                                 },
                    debits: [],
                    total_debit: 0,
                    credits: [],
                    total_credit: 0
                  }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  addCredit = (credit) =>
  {
    this.state.credits.push(credit);
    this.updateCreditAmount();
  }

  addDebit = (debit) =>
  {
    this.state.debits.push(debit);
    this.updateDebitAmount();
  }

  // Update the credit amount when data is changed
  updateCreditAmount = () =>
  {
    let credits = 0;
    this.state.credits.forEach(credit => { credits += credit.amount });
    this.setState({total_credit: credits});
  }

  // Update the debit amount when data is changed
  updateDebitAmount = () =>
  {
    let debits = 0;
    this.state.debits.forEach(debit => { debits += debit.amount });
    this.setState({total_debit: debits});
  }

  totalBalance = () =>
  {
    let total = this.state.total_credit - this.state.total_debit;
    this.setState({accountBalance: total.toFixed(2)});
  }

   //Loads the debit information from the api
   componentDidMount = async () => 
   {
    let debits_api = "https://moj-api.herokuapp.com/debits";
    let credits_api = "https://moj-api.herokuapp.com/credits";
    
    try {
      let response = await axios.get(debits_api);
      console.log(response);
      this.setState({debits: response.data});

      response = await axios.get(credits_api);
      console.log(response);
      this.setState({credits: response.data});
    }
    catch (error) {
      if(error.response) {
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
      }
    }
    this.updateDebitAmount();
    this.updateCreditAmount();
    this.totalBalance();
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
    const DebitsComponent = () => (<Debits debits={this.state.debits} accountBalance={this.state.accountBalance} addDebit={this.addDebit} total_debit={this.state.total_debit}/>);

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debits" render={DebitsComponent}/>
          </div>
        </Router>
    );
  }
}

export default App;
