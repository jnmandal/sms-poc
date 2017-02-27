const FETCH_MESSAGES = 'FETCH_MESSAGES';
const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
const SEND_MESSAGE = 'SEND_MESSAGE';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';

const BASE_URL = '//localhost:8080';

export default function (state = {}, action) {
  switch (action.type) {
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state.messages,
        [action.message.to]: [
          ...state.messages[action.message.to],
          action.message
        ]
      };
    case FETCH_MESSAGES_SUCCESS:
      return action.messages;
    default:
      return state;
  }
}

const fetchMessagesSuccess = (messages) =>
  ({
    type: FETCH_MESSAGES_SUCCESS,
    messages
  })

export const fetchMessages = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_MESSAGES });
    fetch(`${BASE_URL}/messages`)
      .then(res => res.json())
      .then((messages) => dispatch(fetchMessagesSuccess(messages)))
      .catch(e => console.log(e));
  };
}

export const sendMessage = (number, messageBody) => {
  return (dispatch) => {
    dispatch({ type: SEND_MESSAGE });
    fetch(`${BASE_URL}/send/${number}`)
      .then(res => res.json())
      .then((message) => dispatch(sendMessageSuccess(message)))
      .catch(e => console.log(e));
  };
}

const sendMessageSuccess = (message) =>
  ({
    type: FETCH_MESSAGES_SUCCESS,
    message
  })
