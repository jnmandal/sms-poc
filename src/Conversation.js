import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Conversation.css';

const MessageItem = ({body}) =>
  (
    <div>
      {body}
    </div>
  )

class Conversation extends Component {
  render () {
    return (
      <section className="Conversation">
        <div>
          {
            this.props.messages &&
            this.props.messages[this.props.params.number] &&
            this.props.messages[this.props.params.number]
              .map(message =>
                <MessageItem key={message.id} {...message} />)
          }
        </div>
        <form>
          <input type="text" placeholder="new message" />
          <button>send</button>
        </form>
      </section>
    );
  }
}

const stateToProps = ({ messages }) =>
  ({
    messages
  })

export default connect(stateToProps)(Conversation);
