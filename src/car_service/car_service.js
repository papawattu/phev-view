import { Observable } from 'rxjs'
import { encode, decode, toMessageArray } from '../car_message/encoder_decoder'
import PhevMqtt from 'phev-mqtt'
import { log } from 'phev-utils'
import codes from '../ref_data/phev_codes'
import { messages } from '../stubs/fakeData'

const PING_SEND_CMD = 0xf9
const PING_RESP_CMD = 0x9f
const START_SEND = 0xf2
const START_RESP = 0x2f
const SEND_CMD = 0xf6
const RESP_CMD = 0x6f
const DEFAULT_LENGTH = 4
const REQUEST_TYPE = 0
const RESPONSE_TYPE = 1
const EMPTY_DATA = Buffer.from([0]);

const isStubbed = process.env.STUB ? true : false


const stubMqtt = {
    subscribe: () => undefined,
    send: () => undefined,
    messages: () => Observable.of({topic: 'phev/receive', message: messages })
}

const CarService = config => {

    const { mqttUri, sendTopic, receiveTopic} = config

    const phevMqtt = isStubbed ? stubMqtt : PhevMqtt({uri: mqttUri})

    const sendMessage = message => {
        log.debug('>> ' + JSON.stringify(message))

        phevMqtt.send(sendTopic, encode(message))
    }
    const receivedMessages = () => {
        phevMqtt.subscribe(receiveTopic)
        return phevMqtt.messages(receiveTopic)
            .map(x => x.message)
    }

    const splitMessages = () => receivedMessages().flatMap(x => toMessageArray(x))

    const decodedMessages = () => splitMessages()
        .map(x => decode(x))
        .do(x => log.debug('<< ' + JSON.stringify(x)))
        .filter(x => x.type == REQUEST_TYPE)

    const commandMessages = () => decodedMessages().filter(x => x.command !== PING_RESP_CMD && x.command !== START_RESP)

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


    const sendFullCommand = (register, data) => {
        const msg = buildMsg(SEND_CMD)(REQUEST_TYPE)(register)(DEFAULT_LENGTH + data.length-1)(data)
        sendMessage(msg)
    }
    const sendSimpleCommand = (register, value) => {
        const msg = buildMsg(SEND_CMD)(REQUEST_TYPE)(register)(DEFAULT_LENGTH)(Buffer.from([value]))
        sendMessage(msg)
    }

    const sendDateSync = date => sendFullCommand(codes.KO_WF_DATE_INFO_SYNC_SP,Buffer.from([date.getFullYear()-2000,date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds(),1]))

    const defaultResponse = message => buildMsg(swapNibble(message.command))(!message.type & 1)(message.register)(DEFAULT_LENGTH)(EMPTY_DATA)

    const createPingResponse = num => buildMsg(PING_RESP_CMD)(RESPONSE_TYPE)(num)(DEFAULT_LENGTH)(Buffer.from([6]))
    const createPingRequest = num => buildMsg(PING_SEND_CMD)(REQUEST_TYPE)(num)(DEFAULT_LENGTH)(EMPTY_DATA)
    const pingMessage = num => sendMessage(createPingRequest(num))

    const pingInterval = (interval, count) => new Observable
        .interval(interval)
        .map(x => x % 100)
        .do(x => pingMessage(x))

    const pingResponseMessages = timeout => decodedMessages()
        //.timeout(timeout)
        .filter(x => x.command === PING_RESP_CMD)
        .map(x => x.register)

    const startPing = (interval, timeout) => pingInterval(interval)
        .sequenceEqual(pingResponseMessages(timeout))
     //   .retryWhen(errors => errors
     //       .do(err => log('Ping ' + err + ' restarting in 5 seconds'))
     //       .delayWhen(val => Observable.timer(30000))
       // )
    const pingSub = startPing(1000, 10000)
        .subscribe(x => {
     //       log('retry failure' + JSON.stringify(x))
     //           x.subscribe(y => log('+++' + y), err => {
     //               log('Retry Error ' + err)
     //               pingSub.unsubscribe()
     //           })
        })

    const sendInit = () => {
        sendMessage(buildMsg(START_SEND)(REQUEST_TYPE)(1)(10)(Buffer.from([0x24,0x0d,0xc2,0xc2,0x91,0x85])))
        sendMessage(buildMsg(SEND_CMD)(REQUEST_TYPE)(0xaa)(DEFAULT_LENGTH)(EMPTY_DATA))
    }
    return {
        sendInit: sendInit,
        sendMessage: sendMessage,
        receivedMessages: receivedMessages,
        decodedMessages: decodedMessages,
        commandMessages: commandMessages,
        expectedResponse: expectedResponse,
        sendSimpleCommand: sendSimpleCommand,
        sendFullCommand: sendFullCommand,
        sendDateSync: sendDateSync,
        startPing: startPing,
    }
}


export default CarService