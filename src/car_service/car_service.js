import { Observable } from 'rxjs'
import { encode, decode, toMessageArray } from '../car_message/encoder_decoder'
import { send, messages, subscribe, unsubscribe } from './mqtt_client'
import { sendTopic, receiveTopic } from '../config'

const PING_SEND_CMD = 0xf9
const PING_RESP_CMD = 0x9f
const REQUEST_TYPE = 0
const RESPONSE_TYPE = 1
const EMPTY_DATA = Buffer.from([0]);

const createPingRequest = num => {
    const request = {}

    request.command = PING_SEND_CMD
    request.length = 4
    request.type = REQUEST_TYPE
    request.register = num
    request.data = EMPTY_DATA

    return request
}

const pingMessage = num => encode(createPingRequest(num))

const pingInterval = interval => new Observable.interval(interval)
        .map(x => x % 100)
        .map(x => pingMessage(x))

const startPing = (interval, timeout) => pingInterval(interval).subscribe(message => reply(sendMessage(message),timeout))

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

const expectedResponse = message => {
    const response = {}

    response.command = swapNibble(message.command) 
    response.type = !message.type & 1
    response.register = message.register
    response.length = 4
    response.data = Buffer.from([0])  
    
    return response
}

const reply = (message, timeout) => decodedMessages()
    .filter(x => encode(expectedResponse(message)).equals(encode(x)))
    .timeout(timeout)

export { reply, generateChecksum, expectedResponse, receivedMessages, sendMessage, splitMessages, decodedMessages, startPing }