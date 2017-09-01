import { Observable } from 'rxjs'
import { encode, decode, toMessageArray } from '../car_message/encoder_decoder'
import { send, messages, subscribe, unsubscribe } from 'phev-mqtt'
import { sendTopic, receiveTopic } from '../config'

const PING_SEND_CMD = 0xf9
const PING_RESP_CMD = 0x9f
const SEND_CMD = 0xf6
const RESP_CMD = 0x6f
const DEFAULT_LENGTH = 4
const REQUEST_TYPE = 0
const RESPONSE_TYPE = 1
const EMPTY_DATA = Buffer.from([0]);

const sendMessage = message => send(sendTopic, message)

const receivedMessages = () => {
    subscribe(receiveTopic)
    return messages(receiveTopic).map(x => x.message)
}

const splitMessages = () => receivedMessages().flatMap(x => toMessageArray(x))

const decodedMessages = () => splitMessages().map(x => decode(x))

const commandMessages = () => decodedMessages().filter(x => x.command !== PING_RESP_CMD)

const swapNibble = byte => ((byte & 0xf) << 4) | ((byte & 0xf0) >> 4)

const generateChecksum = data => data.reduce((y, x) => y + x & 0xff, 0)

const responses = {
    'f9': message => pingResponse(message),
    'f6': message => defaultResponse(message),
    'f2': message => defaultResponse(message),
    '2f': message => defaultResponse(message),
    '6f': message => defaultResponse(message),
    '9f': message => defaultResponse(message)
}

const expectedResponse = message => responses[message.command.toString(16)](message)

const buildMsg =
    command =>
        type =>
            register =>
                length =>
                    data => ({
                        command: command,
                        type: type,
                        register: register,
                        length: length,
                        data: data
                    })

const defaultResponse = message => buildMsg(swapNibble(message.command))(!message.type & 1)(message.register)(DEFAULT_LENGTH)(EMPTY_DATA)

const reply = (message, timeout) => decodedMessages()
    .filter(x => encode(expectedResponse(message)).equals(encode(x)))
    .timeout(timeout);

const createPingResponse = num => buildMsg(PING_RESP_CMD)(RESPONSE_TYPE)(num)(DEFAULT_LENGTH)(Buffer.from([6]))
const createPingRequest = num => buildMsg(PING_SEND_CMD)(REQUEST_TYPE)(num)(DEFAULT_LENGTH)(EMPTY_DATA)
const pingMessage = num => sendMessage(encode(createPingRequest(num)))

const pingInterval = (interval, count) => new Observable
    .interval(interval)
    .map(x => x % 100)
    .do(x => pingMessage(x))

const pingResponseMessages = (timeout) => decodedMessages()
    .timeout(timeout)
    .filter(x => x.command === PING_RESP_CMD)
    .map(x => x.register)   

const startPing = (interval, timeout) => pingInterval(interval)
    .sequenceEqual(pingResponseMessages(timeout))
    
const stopPing = subscription => subscription.unsubscribe()

export {
    reply, generateChecksum, expectedResponse, receivedMessages,
    sendMessage, splitMessages, decodedMessages, startPing, pingInterval,
    pingResponseMessages, commandMessages
}