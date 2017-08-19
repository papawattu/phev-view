import { Observable } from 'rxjs'
import { encode } from '../car_message/encoder_decoder'

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
    const { interval, sendToQueue } = props
    return new Observable.interval(interval)
        .map(x => x % 100)
        .map(x => createPingRequest(x))
        .map(x => encode(x))
        .map(x => sendToQueue(x))
}

const pong = () => {
    return new Observable(obv => {
        const t = setTimeout(() => {
            obv.next(counter(count))
        }, 1000)
    })
}

const counter = x => x < 99 ? x + 1 : 0

const pingPong = props => ping(props)

export { pingPong }