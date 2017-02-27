import { config } from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  config();
}

import twilio, { TwimlResponse } from 'twilio';
import express from 'express';
import { json, urlencoded } from 'body-parser';

const {
  TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, PORT
} = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

// enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// TODO just use mongo?
class MessageList {
  messages = {};
  id = 1;

  save(data) {
    // save some data about sent message in-memory
    const message = {
      id: this.id,
      to: data.to || data.To,
      from: data.from || data.From,
      body:  data.body || data.Body,
      sent: data.dateCreated || new Date().toJSON()
    }

    // increment id so the front end has a uid
    this.id ++;

    const key = (message.to === TWILIO_PHONE_NUMBER) ?
      message.from : message.to;

    if (this.messages[key]) {
      this.messages[key].push(message);
    } else {
      this.messages[key] = [ message ];
    }
  }

  list(number) {
    number = number[0] === '+' ? number : `+${number}`;
    return this.messages[number] || [];
  }

  listAll() {
    return this.messages;
  }
}

const messageList = new MessageList();

// + is interpretted as space by browsers so omit this character
// we will add it automatically
app.post('/send/:number', (req, res) => {
  // TODO also validate number sent
  if (!req.body.message) {
    return res
      .status(400)
      .send('ERROR: No message body found')
  }

  const toNumber = `+${req.params.number}`;

  const msg = client.messages.create({
    to: toNumber,
    from: TWILIO_PHONE_NUMBER,
    body: req.body.message
  }, (err, message) => {
    if (!err) {
      messageList.save(message);
      res
        .status(201)
        .send(message);
    } else {
      console.log('ERROR: Twilio message failed to send.');
      console.log(err.message);
      res
        .status(400)
        .send(err);
    }
  });
});

app.post('/reply', (req, res) => {
  messageList.save(req.body);
  res.status(201).send('OK');
});

app.get('/messages/', (req, res) => {
  res.status(200).send(
    messageList.listAll());
});

app.get('/messages/:number', (req, res) => {
  res.status(200).send(
    messageList.list(`+${req.params.number}`));
});

const port = PORT || 8080;
app.listen(
  port,
  () => console.log(`server running at http://localhost:${port}`)
);
