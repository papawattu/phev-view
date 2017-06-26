const mqtt = require('mqtt');
const EncoderDecoder = require('./encoder_decoder');
const Responder = require('./responder');
import * as registerHandler from './register_handler';
import * as firebase from 'firebase';
import CarData from './car_data';

function component(text) {
  var element = document.createElement('div');

  element.innerHTML = text;

  return element;
}

function resetButton(root) {
  const element = root.createElement('div');
  const button = root.createElement('button');

  button.name = 'reset';
  button.innerText = 'Reset'
  button.onclick = (e => {
    button.innerText = 'Reseting....'
    button.disabled = true;
    client.publish('phev/reset', '');
    setTimeout(() => {
      button.innerText = 'Reset'
      button.disabled = false;
    }, 5000);
  });
  element.appendChild(button);
  root.body.appendChild(element);
}
function connectButton(root) {
  const element = root.createElement('div');
  const button = root.createElement('button');

  button.name = 'connect';
  button.innerText = 'connect'
  button.onclick = (e => {
    button.disabled = true;
    client.publish('phev/send', Buffer.from([0xf2, 0x0a, 0x00, 0x01, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff]));
    setTimeout(() => {
      button.disabled = false;
    }, 5000);
  });
  element.appendChild(button);
  root.body.appendChild(element);
}
function validationError(text) {
  const error = document.createElement('div');
  error.innerText = text;
  document.body.appendChild(error);
}

function validateSendCommand(register, value) {
  const hexRx = /^[A-Fa-f0-9]+$/;
  if (hexRx.exec(register)) {
    if (hexRx.exec(value)) {
      return true;
    }
  }
  return false;
}

function sendCommand(register, value, validationError) {
  const message = {};
  message.command = 0xf6;
  message.register = parseInt(registerInput.value, 16);
  message.data = Buffer.from([parseInt(valueInput.value, 16)]);
  client.publish('phev/send', EncoderDecoder.encode(message)); F
}
function sendCommandComponent(root) {
  const element = document.createElement('div');
  const registerInput = document.createElement('input');
  const registerLabel = document.createElement('label');
  const valueInput = document.createElement('input');
  const valueLabel = document.createElement('label');
  const sendButton = document.createElement('button');

  registerInput.type = 'text';
  registerInput.maxLength = 2;
  registerInput.minLength = 2;
  registerInput.name = 'register';
  registerInput.id = 'register';
  registerLabel.innerText = 'Register';
  registerLabel.appendChild(registerInput);

  valueInput.type = 'text';
  valueInput.maxLength = 2;
  valueInput.minLength = 2;
  valueInput.name = 'value';
  valueInput.id = 'value';
  valueLabel.innerText = 'Value';
  sendButton.innerText = 'send';
  valueLabel.appendChild(valueInput);

  sendButton.onclick = () =>
    (validateSendCommand(registerInput.value, valueInput.value) ?
      sendCommand(registerInput.value, valueInput.value) : validationError('input invalid'));

  const legend = document.createElement('legend');
  legend.appendChild(document.createTextNode('Registers'));

  element.appendChild(document.createElement('fieldset'))
    .appendChild(legend)
    .parentElement.appendChild(registerLabel)
    .appendChild(document.createElement('br'))
    .parentElement.appendChild(valueLabel)
    .parentElement.appendChild(document.createElement('br'))
    .parentElement.appendChild(sendButton);

  root.body.appendChild(element);
}

function refeshRegisterDisplay() {
  const regs = registerHandler.getRegisters();
  console.log('Refreshing');
  const responses = document.getElementById('responses');
  const updated = document.getElementById('updated');

  while (responses.hasChildNodes()) {
    responses.removeChild(responses.lastChild);
  }
  regs.forEach((value, key) => {
    if (key == 0x12) {
      if (updated.lastChild) {
        updated.removeChild(updated.lastChild);
      }
      updated.appendChild(document.createTextNode('20' + value[0] + '-' + value[1] + '-' + value[2] + '-' + value[3] + ':' + value[4] + ':' + value[5]));
    } else {
      document.getElementById('responses').appendChild(component('Reg ' + key.toString(16) + ' ' + value.toString('hex')));
    }
  });
}
const client = mqtt.connect('ws://jenkins.wattu.com:8080/mqtt');
client.subscribe('phev/receive');

client.on('message', (topic, payload) => {
  let response = Buffer.from([]);
  EncoderDecoder.popMessage(payload, (data) => {
    const message = EncoderDecoder.decode(data);
    //document.body.appendChild(component('message ' + data.toString('hex')));
    //document.body.appendChild(component('Response ' + EncoderDecoder.encode(Responder.respond(message)).toString('hex')));
    response = Buffer.concat([response, EncoderDecoder.encode(Responder.respond(message))]);
    if (message.command == 0x6f && message.type == 0) {
      registerHandler.updateRegister(message.register, message.data);
   //   CarData.update(message.register,message.data);
    }
  });
  client.publish('phev/send', response);

  refeshRegisterDisplay();

});

sendCommandComponent(document);
resetButton(document);
connectButton(document);

const styleEl = document.createElement('style');
let styleSheet;

document.head.appendChild(styleEl);

styleSheet = styleEl.sheet;

styleSheet.insertRule('* { margin: 10px }', 0);


const config = {
    apiKey: "AIzaSyDo4HOpjUvts6hLHOjDD4ehSkJzUXykNyE",
    authDomain: "phev-db3fa.firebaseapp.com",
    databaseURL: "https://phev-db3fa.firebaseio.com",
    projectId: "phev-db3fa",
    storageBucket: "phev-db3fa.appspot.com",
    messagingSenderId: "557258334399"
  };
  firebase.initializeApp(config);
const database = firebase.database;
let codes = null;

database().ref('/').once('value',(code) => {
  console.log(code.val().codes);
  codes = code.val().codes;
});