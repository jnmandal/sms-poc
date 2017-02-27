import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from './redux/Messages';
import './NewMessage.css';

class NewMessage extends Component {
  state = {
    toNumber: '',
    body: ''
  }
  _onChange(e) {
    console.log(e);
  }
  _onSubmit(e) {

  }
  render () {
    return (
      <form
        className="NewMessage"
        onSubmit={this._onSubmit} >
        <label>to number</label>
        <input
          onChange={this._onChange}
          type="tel" />
        <label>message</label>
        <textarea
          onChange={this._onChange}
          placeholder="try socialism" />
        <input type="submit" />
      </form>
    );
  }
}

export default NewMessage;
