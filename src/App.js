import React, { Component } from 'react';
import logo from '../public/logo.png';
import './App.css';
import { connect } from 'react-redux';
import ContactList from './ContactList';
import Conversation from './Conversation';
import { fetchMessages } from './redux/Messages';

class App extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Example App</h2>
        </div>
        <div className="App-content">
          <ContactList
            selectedNumber={this.props.params.number}
            messages={this.props.messages}
            />
          {this.props.children}
        </div>
      </div>
    );
  }
}

const stateToProps = ({ messages }) =>
  ({
    messages
  })

const dispatchToProps = (dispatch) =>
  ({
    fetchMessages: () => dispatch(fetchMessages())
  })

export default connect(stateToProps, dispatchToProps)(App);
