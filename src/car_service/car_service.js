import { Observable } from 'rxjs'
import { encode, decode, toMessageArray } from '../car_message/encoder_decoder'
import { send, messages, subscribe, unsubscribe } from './mqtt_client'
import { sendTopic, receiveTopic } from '../config'

const PING_SEND_CMD = 0xf9
const PING_RESP_CMD = 0x9f
const SEND_CMD = 0xf6
const RESP_CMD = 0x6f
const DEFAULT_LENGTH = 4
const REQUEST_TYPE = 0
const RESPONSE_TYPE = 1
const EMPTY_DATA = Buffer.from([0]);

const pingMessage = num => sendMessage(encode(createPingRequest(num)))

const pingInterval = interval => new Observable
        .interval(interval)
        .map(x => x % 100)
        .do(x => pingMessage(0))

const pingOk = () => console.log('ping ok')

const pingTimeout = err => console.log('ping timeout ' + err)

const startPing = (interval, timeout) => pingInterval(interval)
    .do(x => console.log('###' + x))
    .map(x => reply(createPingRequest(0)),timeout)
    
const stopPing = subscription => subscription.unsubscribe()

const sendMessage = message => send(sendTopic,message)

const receivedMessages = () => {
    subscribe(receiveTopic)
    return messages(receiveTopic).map(x => x.message)
    
}

const splitMessages = () => receivedMessages().flatMap(x => toMessageArray(x))

const decodedMessages = () => splitMessages().map(x => decode(x))

const swapNibble = byte => ((byte & 0xf) << 4) | ((byte & 0xf0) >> 4) 

const generateChecksum = data => data.reduce((y, x) => y + x & 0xff,0)

const responses = {
    'f9' : message => pingResponse(message),
    'f6' : message => defaultResponse(message),
    'f2' : message => defaultResponse(message)
}

const expectedResponse = message => responses[message.command.toString(16)](message)

const createPingRequest = num => buildMsg(PING_SEND_CMD)(REQUEST_TYPE)(num)(DEFAULT_LENGTH)(EMPTY_DATA)

const buildMsg = 
    command => 
    type => 
    register => 
    length => 
    data => ({ 
        command : command, 
        type : type, 
        register : register, 
        length: length,
        data: data
    })

const defaultResponse = message => buildMsg(swapNibble(message.command))(RESPONSE_TYPE)(message.register)(DEFAULT_LENGTH)(EMPTY_DATA)

const pingResponse = message => buildMsg(
    swapNibble(message.command))(!message.type & 1)(message.register)(DEFAULT_LENGTH)(Buffer.from([6]))

const reply = (message, timeout) => decodedMessages()
    .filter(x => encode(expectedResponse(message)).equals(encode(x)))
    .timeout(timeout)

export { reply, generateChecksum, expectedResponse, receivedMessages, sendMessage, splitMessages, decodedMessages, startPing }