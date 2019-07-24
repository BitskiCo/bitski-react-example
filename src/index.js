import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Bitski } from 'bitski';
import Web3 from 'web3';

const bitski = new Bitski(process.env.REACT_APP_BITSKI_CLIENT_ID, `${window.location.origin}/callback.html`);
const provider = bitski.getProvider();
const web3 = new Web3(provider);

ReactDOM.render(<App bitski={bitski} web3={web3} provider={provider} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
