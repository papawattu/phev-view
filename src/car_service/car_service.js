import { Observable } from 'rxjs'
import { encode, popMessage } from '../car_message/encoder_decoder'
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

const ping = props => {
    const { interval } = props
    return new Observable.interval(interval)
        .map(x => x % 100)
        .map(x => createPingRequest(x))
        .map(x => encode(x))
        .map(x => sendMessage(x))
}

const sendMessage = message => send(sendTopic,message)

const receivedMessages = () => {
    subscribe(receiveTopic)
    return messages(receiveTopic).map(x => x.message)
}

export { receivedMessages, sendMessage }