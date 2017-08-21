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

const startPing = interval => pingInterval(interval).subscribe(message => sendMessage(message))

const stopPing = subscription => subscription.unsubscribe()

const sendMessage = message => send(sendTopic,message)

const receivedMessages = () => {
    subscribe(receiveTopic)
    return messages(receiveTopic).map(x => x.message)
}

const splitMessages = () => receivedMessages().flatMap(x => toMessageArray(x))

const decodedMessages = () => splitMessages().map(x => decode(x))

export { receivedMessages, sendMessage, splitMessages, decodedMessages }