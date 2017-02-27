import React, { Component } from 'react';
import { Link } from 'react-router';
import './ContactList.css';

const ContactListItem = (props) =>
  ( props.active ?
      <li>{props.number}</li>:
      <Link
        to={props.number}
        tabIndex="1">
        <li>{props.number}</li>
      </Link>
  )

class ContactList extends Component {
  render () {
    return (
      <section className="ContactList">
        <div>
          <input type="text" placeholder="search" />
          <Link to="new">
            <button>new</button>
          </Link>
        </div>
        <ul className="ContactList-list">
          {
            Object.keys(this.props.messages)
              .map(number =>
                <ContactListItem
                  active={this.props.selectedNumber === number}
                  key={number}
                  number={number} />)
          }
        </ul>
      </section>
    );
  }
}

export default ContactList;
