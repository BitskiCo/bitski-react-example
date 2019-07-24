import React from 'react';
import { LoginForm } from './LoginForm';
import { Account } from './Account';
import './App.css';
import { AuthenticationStatus } from 'bitski';

class ErrorMessage extends React.Component {
  render() {
    if (!this.props.error) { return null; }
    return (
      <p className="text-danger">{this.state.error.message}</p>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);

    const isLoggedIn = this.props.bitski.authStatus !== AuthenticationStatus.NotConnected;
    this.state = { loggedIn: isLoggedIn };

    this.props.provider.on('block', (block) => {
      this.setState({ blockNumber: block.number });
      this.loadBalance();
    });

    this.props.web3.eth.net.getId().then((id) => {
      this.setState({ networkId: id });
    });

    this.loadAccounts();
    this.loadUser();
  }

  loadAccounts() {
    if (!this.state.loggedIn) {
      return;
    }
    this.props.web3.eth.getAccounts().then((accounts) => {
      this.setState({ account: accounts[0] });
      this.loadBalance();
    });
  }

  loadBalance() {
    if (this.state.account) {
      this.props.web3.eth.getBalance(this.state.account).then((balance) => {
        const ethBalance = this.props.web3.utils.fromWei(balance);
        this.setState({ balance: ethBalance });
      }).catch(error => {
        console.error(error);
      });
    }
  }

  loadUser() {
    if (this.state.loggedIn) {
      this.props.bitski.getUser().then((user) => {
        this.setState({ user });
      });
    }
  }

  signIn() {
    const bitski = this.props.bitski;
    bitski.signIn().then((user) => {
      this.setState({ loggedIn: true, user, error: null });
      this.loadAccounts();
    }).catch((error) => {
      this.setState({ error });
    });
  }

  signOut() {
    const bitski = this.props.bitski;
    bitski.signOut().then(() => {
      this.setState({ loggedIn: false, user: null, account: null, balance: null, error: null });
    }).catch((error) => {
      this.setState({ error });
    });
  }

  render() {
    let main;

    if (this.state.loggedIn) {
      main = <Account account={this.state.account} user={this.state.user} balance={this.state.balance} onSignOut={this.signOut} web3={this.props.web3} />;
    } else {
      main = <LoginForm onSignIn={this.signIn} />;
    }

    return (
      <div className="d-flex flex-column vh-100">
        <div className="App flex-grow-1 d-flex align-items-center justify-content-center">
          <ErrorMessage error={this.state.error} />
          <section className="App-main">{main}</section>
        </div>
        <footer className="App-footer border-top pt-3 text-center">
          <ul className="list-unstyled list-inline text-muted">
            <li className="list-inline-item"><strong>Bitski React Example</strong></li>
            <li className="list-inline-item">Current Block #{this.state.blockNumber}</li>
          </ul>
        </footer>
      </div>
    );
  }
}
