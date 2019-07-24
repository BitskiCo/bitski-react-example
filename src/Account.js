import React from 'react';
import './Account.css';

class Address extends React.Component {
  render() {
    return (
      <div className="Address">Your address is {this.props.account}.</div>
    );
  }
}

class Balance extends React.Component {
  render() {
    if (!this.props.balance) {
      return (
        <div className="Balance">Loading...</div>
      );
    }
    return (
      <div className="Balance">
        Current Balance
        <h5>{this.props.balance} ETH</h5>
      </div>
    );
  }
}

export class Account extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.state = {};
  }

  handleLogOut() {
    this.props.onSignOut();
  }

  render() {
    if (!this.props.account) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div>
        <Balance balance={this.props.balance} />
        <Address account={this.props.account} />
        <div className="Account-logout small">
          Logged in as {this.props.user.id}. <button className="btn btn-link btn-sm d-inline p-0 align-baseline" onClick={this.handleLogOut}>Log Out</button>
        </div>
      </div>
    );
  }
}
