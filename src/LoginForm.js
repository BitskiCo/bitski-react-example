import React from 'react';
import './LoginForm.css';

export class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSignIn();
  }

  render() {
    return (
      <div className="LoginForm">
        <h3>Sign In</h3>
        <p>You need to sign in before we can connect to your wallet.</p>
        <button className="btn btn-primary btn-lg" onClick={this.handleClick}>Connect with Bitski</button>
      </div>
    );
  }
}
