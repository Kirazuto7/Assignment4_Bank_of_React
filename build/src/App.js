// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {  accountBalance: 0,
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
    this.setState({credits: this.state.credits});
    this.totalBalance();
  }

  addDebit = (debit) =>
  {
    this.state.debits.push(debit);
    this.setState({debits: this.state.debits});
    this.totalBalance();
  }

  totalBalance = () =>
  {
    let debits = 0;
    let credits = 0;
    this.state.debits.forEach(debit => { debits += debit.amount });
    this.setState({total_debit: parseFloat(debits.toFixed(2))});
    this.state.credits.forEach(credit => { credits += credit.amount });
    this.setState({total_credit: parseFloat(credits.toFixed(2))});
    let total = credits - debits;
    this.setState({accountBalance: parseFloat(total.toFixed(2))});
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
    this.totalBalance();
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);  // Pass props to "LogIn" component
    const DebitsComponent = () => (<Debits debits={this.state.debits} accountBalance={this.state.accountBalance} total_debit={this.state.total_debit} addDebit={this.addDebit} />);
    const CreditsComponent = () => (<Credits credits={this.state.credits} accountBalance={this.state.accountBalance} total_credit={this.state.total_credit} addCredit={this.addCredit} />);

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debits" render={DebitsComponent}/>
            <Route exact path="/credits" render={CreditsComponent}/>
          </div>
        </Router>
    );
  }
}

export default App;
